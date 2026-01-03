/**
 * GitHub API helper for creating files directly in repository
 * Used in Vercel production where filesystem is read-only
 */

interface GitHubFileCreate {
  owner: string;
  repo: string;
  path: string;
  content: string;
  message: string;
  branch?: string;
}

/**
 * Create or update a file in GitHub repository using GitHub API
 */
export async function createGitHubFile(params: GitHubFileCreate): Promise<void> {
  const { owner, repo, path, content, message, branch = 'master' } = params;

  // GitHub Personal Access Token from environment
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    throw new Error('GITHUB_TOKEN not set in environment variables');
  }

  // Base64 encode content
  const contentBase64 = Buffer.from(content, 'utf-8').toString('base64');

  // GitHub API endpoint
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;

  // Check if file exists first (to get SHA for update)
  let sha: string | undefined;
  try {
    const checkResponse = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Pisicopedia-Auto-Post',
      },
    });

    if (checkResponse.ok) {
      const existing = await checkResponse.json();
      sha = existing.sha;
      console.log(`[GitHub] File exists, will update with SHA: ${sha}`);
    }
  } catch (error) {
    // File doesn't exist, will create new
    console.log(`[GitHub] File doesn't exist, will create new`);
  }

  // Create or update file
  const body: any = {
    message,
    content: contentBase64,
    branch,
  };

  if (sha) {
    body.sha = sha; // Required for updates
  }

  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
      'User-Agent': 'Pisicopedia-Auto-Post',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`GitHub API error: ${response.status} - ${error}`);
  }

  const result = await response.json();
  console.log(`[GitHub] File created/updated: ${result.content.html_url}`);
}

/**
 * Create multiple files in a single commit (more efficient)
 */
export async function createMultipleGitHubFiles(
  owner: string,
  repo: string,
  files: Array<{ path: string; content: string }>,
  message: string,
  branch: string = 'master'
): Promise<void> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    throw new Error('GITHUB_TOKEN not set in environment variables');
  }

  // Get reference of branch
  const refUrl = `https://api.github.com/repos/${owner}/${repo}/git/ref/heads/${branch}`;
  const refResponse = await fetch(refUrl, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'Pisicopedia-Auto-Post',
    },
  });

  if (!refResponse.ok) {
    throw new Error(`Failed to get branch reference: ${refResponse.statusText}`);
  }

  const refData = await refResponse.json();
  const latestCommitSha = refData.object.sha;

  // Get latest commit
  const commitUrl = `https://api.github.com/repos/${owner}/${repo}/git/commits/${latestCommitSha}`;
  const commitResponse = await fetch(commitUrl, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'Pisicopedia-Auto-Post',
    },
  });

  if (!commitResponse.ok) {
    throw new Error(`Failed to get commit: ${commitResponse.statusText}`);
  }

  const commitData = await commitResponse.json();
  const baseTreeSha = commitData.tree.sha;

  // Create blobs for each file
  const tree = [];
  for (const file of files) {
    const blobUrl = `https://api.github.com/repos/${owner}/${repo}/git/blobs`;
    const blobResponse = await fetch(blobUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
        'User-Agent': 'Pisicopedia-Auto-Post',
      },
      body: JSON.stringify({
        content: file.content,
        encoding: 'utf-8',
      }),
    });

    if (!blobResponse.ok) {
      throw new Error(`Failed to create blob: ${blobResponse.statusText}`);
    }

    const blobData = await blobResponse.json();
    tree.push({
      path: file.path,
      mode: '100644',
      type: 'blob',
      sha: blobData.sha,
    });
  }

  // Create tree
  const treeUrl = `https://api.github.com/repos/${owner}/${repo}/git/trees`;
  const treeResponse = await fetch(treeUrl, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
      'User-Agent': 'Pisicopedia-Auto-Post',
    },
    body: JSON.stringify({
      base_tree: baseTreeSha,
      tree,
    }),
  });

  if (!treeResponse.ok) {
    throw new Error(`Failed to create tree: ${treeResponse.statusText}`);
  }

  const treeData = await treeResponse.json();

  // Create commit
  const newCommitUrl = `https://api.github.com/repos/${owner}/${repo}/git/commits`;
  const newCommitResponse = await fetch(newCommitUrl, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
      'User-Agent': 'Pisicopedia-Auto-Post',
    },
    body: JSON.stringify({
      message,
      tree: treeData.sha,
      parents: [latestCommitSha],
    }),
  });

  if (!newCommitResponse.ok) {
    throw new Error(`Failed to create commit: ${newCommitResponse.statusText}`);
  }

  const newCommitData = await newCommitResponse.json();

  // Update reference
  const updateRefResponse = await fetch(refUrl, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
      'User-Agent': 'Pisicopedia-Auto-Post',
    },
    body: JSON.stringify({
      sha: newCommitData.sha,
      force: false,
    }),
  });

  if (!updateRefResponse.ok) {
    throw new Error(`Failed to update reference: ${updateRefResponse.statusText}`);
  }

  console.log(`[GitHub] Created commit with ${files.length} files: ${newCommitData.sha}`);
}

