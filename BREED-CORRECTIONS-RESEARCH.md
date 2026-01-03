# 🔬 RESEARCH & CORECȚII PENTRU TOATE RASELE

## 🎯 Obiectiv
Să facem toate informațiile 100% CORECTE și REALE pentru fiecare rasă de pisică.

---

## ❌ PROBLEMA CRITICĂ IDENTIFICATĂ

**Locație:** `app/rase/[slug]/page.tsx` linia 324-331

**Eroare:** Text hardcodat despre "Periere" pentru TOATE rasele:
```typescript
<h3>Periere și Toaletare</h3>
{breed.grooming === 'high'
  ? 'Necesită periere zilnică...'
  : breed.grooming === 'medium'
  ? 'Periere de 2-3 ori pe săptămână...'
  : 'Periere săptămânală suficientă...'}
```

**Rezultat:** Chiar și SFINX (pisică fără păr) apare că "necesită periere" ❌

---

## ✅ SOL

UȚIE: Text Specific pentru Fiecare Tip de Rasă

### Pentru Rase FĂRĂ PĂR (Sfinx, Peterbald):
- **NU** "periere"
- **DA** "Îngrijirea pielii: băi săptămânale cu șampon special, curățarea cu cârpă umedă zilnic"

### Pentru Rase cu PĂR LUNG (Persană, Maine Coon, Norvegian\u0103):
- "Periere zilnică obligatorie pentru prevenirea încâlcirilor"

### Pentru Rase cu PĂR SCURT (British Shorthair, Siameză):
- "Periere săptămânală suficientă"

### Pentru Rase SPECIALE (Devon Rex, Cornish Rex - păr rar):
- "Periere foarte delicată, rar, pentru a nu deteriora părul fin"

---

## 📋 CORECȚII SPECIFICE PENTRU FIECARE RASĂ

### 1. **SFINX** (Canada)
- ❌ ~~Periere~~
- ✅ **Îngrijirea pielii:**
  - Băi săptămânale (piele produce uleiuri)
  - Curățare cu cârpă umedă zilnic
  - Protecție solară (sensibil la soare)
  - Îmbră\u021bișarea regulată - necesită căldură

**Greșeli de corectat:**
- UI zice "Periere săptămânală" → Trebuie "Băi săptămânale pentru îngrijirea pielii"

---

### 2. **PETERBALD** (Rusia)
- Similară cu Sfinx
- ❌ ~~Periere~~
- ✅ Îngrijirea pielii + băi regulate

---

### 3. **DEVON REX** (Anglia)
- Păr foarte scurt și rar
- ❌ ~~Periere intensă~~
- ✅ Periere foarte ușoară 1x/săptămână cu perie moale
- ⚠️ Nu periere agresivă - deteriorează părul fin

---

### 4. **CORNISH REX** (Anglia)
- Păr ondulat, fin
- ❌ ~~Periere cu perie dură~~
- ✅ Perie foarte moale, rar, pentru a nu strica ondulațiile

---

### 5. **PERSANĂ** (Iran)
- Păr FOARTE lung
- ✅ Periere ZILNICĂ OBLIGATORIE
- ✅ Verificare zilnică zone critice (sub coadă, axile, abdomen)
- ✅ Băi lunare cu demăturare profesională

---

### 6. **MAINE COON** (SUA)
- Păr lung, dar mai puțin dens decât Persana
- ✅ Periere zilnică recomandată
- ✅ Atenție la coadă (păr foarte lung)

---

### 7. **NORVEGIAN\u0102 DE PĂDURE** (Norvegia)
- Păr lung, dublu strat, impermeabil
- ✅ Periere 3-4 ori/săptămână
- ⚠️ Naplazire sezonieră intensă (primăvară/toamnă) - periere zilnică

---

### 8. **SIAMEZĂ** (Thailanda)
- Păr scurt, fin, lipit de corp
- ✅ Periere săptămânală sau chiar mai rar
- ✅ Mângâiere cu mână umedă suficientă

---

### 9. **BRITISH SHORTHAIR** (Marea Britanie)
- Păr scurt, dens, "pluș"
- ✅ Periere 1-2 ori/săptămână
- ⚠️ Naplazire sezonieră - periere mai frecventă

---

### 10. **BENGALEZĂ** (SUA)
- Păr scurt, strălucitor, textură "satin"
- ✅ Periere minimă (1x/săptămână)
- ✅ Blană se auto-întreține

---

### 11. **RAGDOLL** (SUA)
- Păr mediu-lung, moale
- ✅ Periere 2-3 ori/săptămână
- ⚠️ Nu se încâlcește ușor (mai ușor decât Persana)

---

### 12. **SCOTTISH FOLD** (Scoția)
- Păr scurt-mediu
- ✅ Periere săptămânală
- ⚠️ ATENȚIE SPECIALĂ LA URECHI (pliate) - curățare regulată

---

### 13. **RUSSIAN BLUE** (Rusia)
- Păr scurt, dublu strat, dens, moale
- ✅ Periere săptămânală
- ⚠️ Naplazire sezonieră intensă

---

### 14. **BIRMANEZĂ** (Myanmar)
- Păr mediu-lung, mătăsos
- ✅ Periere 2 ori/săptămână
- Nu se încâlcește ușor

---

### 15. **ABISSINIANĂ** (Etiopia)
- Păr scurt, fin, "ticked" (fiecare fir multicolor)
- ✅ Periere minimă (1x/săptămână)

---

### 16. **ORIENTAL SHORTHAIR** (Thailanda)
- Păr scurt, fin, lipit
- ✅ Periere minimă sau mângâiere cu mână umedă

---

### 17. **EXOTIC SHORTHAIR** (SUA)
- "Persană cu păr scurt"
- ✅ Periere 2-3 ori/săptămână
- Mai puțină întreținere decât Persana, dar mai multă decât British

---

### 18. **SIBERIANĂ** (Rusia)
- Păr lung, triplu strat, impermeabil
- ✅ Periere 3-4 ori/săptămână
- ⚠️ Naplazire sezonieră INTENSĂ

---

### 19. **TURCEASCĂ ANGORA** (Turcia)
- Păr mediu-lung, fin, mătăsos
- ✅ Periere 2-3 ori/săptămână
- Nu se încâlcește ușor

---

### 20. **TURCEASCĂ VAN** (Turcia)
- Similară cu Angora
- ✅ Periere 2-3 ori/săptămână
- Iubește apa (caracteristică rară)

---

### 21. **CHARTREUX** (Franța)
- Păr scurt-mediu, dublu strat, dens, impermeabil
- ✅ Periere săptămânală
- Textură "lână"

---

### 22. **BALINEZĂ** (SUA)
- "Siameză cu păr lung"
- ✅ Periere 2 ori/săptămână
- Păr mediu-lung, mătăsos

---

### 23. **MANX** (Insula Man)
- Fără coadă (sau coadă scurtă)
- Păr scurt-mediu
- ✅ Periere săptămânală
- **Caracteristică unică:** Fără coadă!

---

### 24. **HIMALAYAN** (SUA)
- Hibrid Persană x Siameză
- Păr FOARTE lung
- ✅ Periere ZILNICĂ OBLIGATORIE (ca Persana)

---

### 25. **SOMALI** (Somalia)
- "Abissiniană cu păr lung"
- ✅ Periere 2 ori/săptămână
- Păr mediu-lung, coadă stufoasă

---

### 26. **OCICAT** (SUA)
- Păr scurt, pete ca leopard
- ✅ Periere minimă (săptămânală)

---

### 27. **SAVANNAH** (SUA)
- Hibrid cu serval (pisică sălbatică)
- Păr scurt
- ✅ Periere minimă
- **Caracteristică:** FOARTE mare, foarte energică

---

### 28. **KORAT** (Thailanda)
- Păr scurt, dublu strat, argintiu-albastru
- ✅ Periere săptămânală

---

### 29. **EUROPEANĂ** (Europa)
- Păr scurt
- ✅ Periere săptămânală

---

### 30. **DOMESTICĂ CU PĂR SCURT** (Global)
- Păr scurt
- ✅ Periere săptămânală

---

## 🎨 PLAN DE ACȚIUNE

### 1. **Fix UI Component (PRIORITATE MAXIMĂ)**
Modific `app/rase/[slug]/page.tsx` să afișeze text SPECIFIC pentru:
- Rase fără păr → "Îngrijirea pielii"
- Rase cu păr lung → "Periere zilnică"
- Rase cu păr scurt → "Periere săptămânală"
- Rase cu păr special → Text personalizat

### 2. **Actualizare Date în `lib/data.ts`**
Adaug câmp nou în fiecare rasă:
```typescript
groomingText: "Text specific pentru fiecare rasă"
```

### 3. **Verificare Imagini**
Toate imaginile să fie exact pentru rasa respectivă (nu stock photos generice)

### 4. **Styling Îmbunătățit**
Text mai frumos, nu "sec", cu:
- Emoji-uri pentru categorii 🐾
- Box-uri colorate pentru informații importante
- Secțiuni clare și aerisite

---

## ✅ CHECKLIST FINALIZARE

- [ ] UI component fixed pentru "Periere și Toaletare"
- [ ] Toate cele 30 de rase au text corect
- [ ] Imagini verificate pentru fiecare rasă
- [ ] Styling îmbunătățit
- [ ] Build & Deploy
- [ ] Verificare finală pe site live

---

**Status:** 🔴 În lucru
**Prioritate:** 🔥 CRITICĂ
**Deadline:** Acum!

