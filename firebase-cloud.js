/* Student's Class — optional Firebase cloud sync (free Spark plan is enough).
   Works as an add-on: if firebase-config.js is unfilled or offline, the app
   stays 100% local. All cross-file helpers (t, esc, toast, openModal, render,
   state, profile, bannerStyle, celebrateEvent) come from app.js. */
(function () {
  "use strict";

  /* ---------- extra translations (merged into app i18n) ---------- */
  const EXTRA = {
    en: { cloud: "Cloud", onlineClasses: "Online classes", thisDevice: "On this device", cloudOff: "Cloud sync is off. Add your Firebase keys to enable it.", signInToSync: "Sign in to sync classes across devices.", signIn: "Sign in", createAccount: "Create account", guestBtn: "Continue as guest", emailAddr: "Email", passwd: "Password", logoutBtn: "Log out", needAuth: "Sign in first.", onlineLabel: "Online class (syncs across devices)", cloudAcc: "Cloud account", signedInCloud: "Signed in", cloudCreated: "Online class created. Code: ", cloudJoined: "Joined online class ", noNet: "No connection to the cloud.", delClass: "Delete class", delClassConfirm: "Delete this online class for everyone?", classDeleted: "Online class deleted", announceHw: "Also post to announcements", hwBadge: "Homework", authTitle: "Welcome back", authSub: "Sign in to sync your classes on every device.", orWord: "or", authNote: "Your classes stay private to your account. We never sell your data.", legal: "Legal", legalSub: "Terms, privacy and cookies.", termsBtn: "Terms & conditions", privBtn: "Privacy policy", cookieBtn: "Cookie policy", closeBtn: "Close", updates: "Updates", updatesSub: "The app updates itself. Updates are required to keep using it.", checkUpdates: "Check for updates", checkingUpdates: "Checking for updates…", upToDate: "You're up to date", downloadingUpdate: "Downloading required update…", updateError: "Couldn't check for updates", tabStream: "Stream", tabClasswork: "Classwork", tabPeople: "People", emailWord: "Email", bioWord: "Bio", statusWord: "Status", guestWord: "Guest", grades: "Grades", yourAverage: "Your average", setGrades: "Set grades", notGraded: "Not graded", gradeRange: "Grade must be between 0 and {m}", gradesSaved: "Grades saved", pin: "Pin", unpin: "Unpin", pinBadge: "Pinned", comments: "Comments", noComments: "No comments yet", commentBtn: "Send", commentPh: "Write a comment…", dueSoon: "Due soon", panel: "Panel", submissions: "Submissions", submit: "Submit", yourSubmission: "Your submission", feedback: "Feedback", submitted: "Submitted", noSubmissions: "No submissions yet", classAverage: "Class average", tasks: "Tasks", linkWarnTitle: "External link", linkWarnMsg: "Links are not verified by Student's Class. Opening them is at your own risk.", visitLink: "Visit link", perms: "Permissions", permsSub: "What this member can do in this class.", permAnnounce: "Create announcements", permHomework: "Create homework", permGrades: "Grade and give feedback", permPanel: "View teacher panel", permsSaved: "Permissions saved", submitPh: "Paste your work or a link…", newActivity: "New activity" },
    es: { cloud: "Nube", onlineClasses: "Clases en línea", thisDevice: "En este dispositivo", cloudOff: "La nube está desactivada. Añade tus claves de Firebase.", signInToSync: "Inicia sesión para sincronizar tus clases.", signIn: "Iniciar sesión", createAccount: "Crear cuenta", guestBtn: "Entrar como invitado", emailAddr: "Correo", passwd: "Contraseña", logoutBtn: "Cerrar sesión", needAuth: "Inicia sesión primero.", onlineLabel: "Clase en línea (se sincroniza)", cloudAcc: "Cuenta en la nube", signedInCloud: "Sesión iniciada", cloudCreated: "Clase en línea creada. Código: ", cloudJoined: "Te uniste a ", noNet: "Sin conexión con la nube.", delClass: "Eliminar clase", delClassConfirm: "¿Eliminar esta clase en línea para todos?", classDeleted: "Clase en línea eliminada", announceHw: "Publicar también en anuncios", hwBadge: "Tarea", authTitle: "Bienvenido de nuevo", authSub: "Inicia sesión para sincronizar tus clases en todos los dispositivos.", orWord: "o", authNote: "Tus clases son privadas. Nunca vendemos tus datos.", legal: "Legal", legalSub: "Términos, privacidad y cookies.", termsBtn: "Términos y condiciones", privBtn: "Política de privacidad", cookieBtn: "Política de cookies", closeBtn: "Cerrar", updates: "Actualizaciones", updatesSub: "La app se actualiza sola. Las actualizaciones son obligatorias para seguir usándola.", checkUpdates: "Buscar actualizaciones", checkingUpdates: "Buscando actualizaciones…", upToDate: "Tienes la última versión", downloadingUpdate: "Descargando actualización obligatoria…", updateError: "No se pudieron buscar actualizaciones", tabStream: "Tablón", tabClasswork: "Trabajo", tabPeople: "Personas", emailWord: "Correo", bioWord: "Biografía", statusWord: "Estado", guestWord: "Invitado", grades: "Notas", yourAverage: "Tu media", setGrades: "Poner notas", notGraded: "Sin nota", gradeRange: "La nota debe estar entre 0 y {m}", gradesSaved: "Notas guardadas", pin: "Fijar", unpin: "Quitar", pinBadge: "Fijada", comments: "Comentarios", noComments: "Aún no hay comentarios", commentBtn: "Enviar", commentPh: "Escribe un comentario…", dueSoon: "Vence pronto", panel: "Panel", submissions: "Entregas", submit: "Entregar", yourSubmission: "Tu entrega", feedback: "Corrección", submitted: "Entregada", noSubmissions: "Aún no hay entregas", classAverage: "Media de la clase", tasks: "Tareas", linkWarnTitle: "Enlace externo", linkWarnMsg: "Los enlaces no están verificados por Student's Class. Abrirlos es bajo tu responsabilidad.", visitLink: "Visitar enlace", perms: "Permisos", permsSub: "Lo que este miembro puede hacer en esta clase.", permAnnounce: "Crear anuncios", permHomework: "Crear tareas", permGrades: "Poner notas y corregir", permPanel: "Ver panel del profe", permsSaved: "Permisos guardados", submitPh: "Pega tu trabajo o un enlace…", newActivity: "Novedad" },
    pt: { cloud: "Nuvem", onlineClasses: "Turmas online", thisDevice: "Neste dispositivo", cloudOff: "Sincronização desligada. Adiciona as chaves do Firebase.", signInToSync: "Inicia sessão para sincronizar.", signIn: "Iniciar sessão", createAccount: "Criar conta", guestBtn: "Entrar como convidado", emailAddr: "Email", passwd: "Palavra-passe", logoutBtn: "Terminar sessão", needAuth: "Inicia sessão primeiro.", onlineLabel: "Turma online (sincroniza)", cloudAcc: "Conta na nuvem", signedInCloud: "Sessão iniciada", cloudCreated: "Turma online criada. Código: ", cloudJoined: "Entraste em ", noNet: "Sem ligação à nuvem.", delClass: "Eliminar turma", delClassConfirm: "Eliminar esta turma online para todos?", classDeleted: "Turma online eliminada", announceHw: "Publicar também nos anúncios", hwBadge: "Trabalho", authTitle: "Bem-vindo de volta", authSub: "Inicia sessão para sincronizar as tuas turmas.", orWord: "ou", authNote: "As tuas turmas são privadas. Nunca vendemos os teus dados.", legal: "Legal", legalSub: "Termos, privacidade e cookies.", termsBtn: "Termos e condições", privBtn: "Política de privacidade", cookieBtn: "Política de cookies", closeBtn: "Fechar", updates: "Atualizações", updatesSub: "A app atualiza-se sozinha. As atualizações são obrigatórias.", checkUpdates: "Procurar atualizações", checkingUpdates: "A procurar atualizações…", upToDate: "Tens a versão mais recente", downloadingUpdate: "A descarregar atualização obrigatória…", updateError: "Não foi possível procurar atualizações", tabStream: "Mural", tabClasswork: "Trabalhos", tabPeople: "Pessoas", emailWord: "Email", bioWord: "Bio", statusWord: "Estado", guestWord: "Convidado", grades: "Notas", yourAverage: "Tua média", setGrades: "Dar notas", notGraded: "Sem nota", gradeRange: "A nota deve estar entre 0 e {m}", gradesSaved: "Notas guardadas", pin: "Afixar", unpin: "Desafixar", pinBadge: "Afixado", comments: "Comentários", noComments: "Ainda sem comentários", commentBtn: "Enviar", commentPh: "Escreve um comentário…", dueSoon: "Vence em breve", panel: "Painel", submissions: "Entregas", submit: "Entregar", yourSubmission: "Tua entrega", feedback: "Correção", submitted: "Entregue", noSubmissions: "Ainda sem entregas", classAverage: "Média da turma", tasks: "Tarefas", linkWarnTitle: "Ligação externa", linkWarnMsg: "As ligações não são verificadas pelo Student's Class. Abri-las é por tua conta e risco.", visitLink: "Visitar ligação", perms: "Permissões", permsSub: "O que este membro pode fazer nesta turma.", permAnnounce: "Criar anúncios", permHomework: "Criar trabalhos", permGrades: "Dar notas e corrigir", permPanel: "Ver painel do professor", permsSaved: "Permissões guardadas", submitPh: "Cola o teu trabalho ou uma ligação…", newActivity: "Novidade" },
    fr: { cloud: "Cloud", onlineClasses: "Cours en ligne", thisDevice: "Sur cet appareil", cloudOff: "Sync désactivée. Ajoutez vos clés Firebase.", signInToSync: "Connectez-vous pour synchroniser.", signIn: "Se connecter", createAccount: "Créer un compte", guestBtn: "Continuer en invité", emailAddr: "Email", passwd: "Mot de passe", logoutBtn: "Se déconnecter", needAuth: "Connectez-vous d'abord.", onlineLabel: "Cours en ligne (synchronisé)", cloudAcc: "Compte cloud", signedInCloud: "Connecté", cloudCreated: "Cours en ligne créé. Code : ", cloudJoined: "Cours rejoint : ", noNet: "Pas de connexion au cloud.", delClass: "Supprimer le cours", delClassConfirm: "Supprimer ce cours en ligne pour tous ?", classDeleted: "Cours en ligne supprimé", announceHw: "Publier aussi dans les annonces", hwBadge: "Devoir", authTitle: "Bon retour", authSub: "Connectez-vous pour synchroniser vos cours.", orWord: "ou", authNote: "Vos cours restent privés. Nous ne vendons jamais vos données.", legal: "Légal", legalSub: "Conditions, confidentialité et cookies.", termsBtn: "Conditions d'utilisation", privBtn: "Politique de confidentialité", cookieBtn: "Politique cookies", closeBtn: "Fermer", updates: "Mises à jour", updatesSub: "L'app se met à jour toute seule. Les mises à jour sont obligatoires.", checkUpdates: "Vérifier les mises à jour", checkingUpdates: "Vérification…", upToDate: "Vous êtes à jour", downloadingUpdate: "Téléchargement de la mise à jour…", updateError: "Impossible de vérifier les mises à jour", tabStream: "Flux", tabClasswork: "Devoirs", tabPeople: "Participants", emailWord: "E-mail", bioWord: "Bio", statusWord: "Statut", guestWord: "Invité", grades: "Notes", yourAverage: "Ta moyenne", setGrades: "Noter", notGraded: "Sans note", gradeRange: "La note doit être entre 0 et {m}", gradesSaved: "Notes enregistrées", pin: "Épingler", unpin: "Désépingler", pinBadge: "Épinglé", comments: "Commentaires", noComments: "Pas encore de commentaires", commentBtn: "Envoyer", commentPh: "Écris un commentaire…", dueSoon: "Échéance proche", panel: "Tableau", submissions: "Remises", submit: "Rendre", yourSubmission: "Ton rendu", feedback: "Correction", submitted: "Rendu", noSubmissions: "Aucune remise", classAverage: "Moyenne du cours", tasks: "Devoirs", linkWarnTitle: "Lien externe", linkWarnMsg: "Les liens ne sont pas vérifiés par Student's Class. Les ouvrir est à vos risques.", visitLink: "Visiter le lien", perms: "Permissions", permsSub: "Ce que ce membre peut faire dans ce cours.", permAnnounce: "Créer des annonces", permHomework: "Créer des devoirs", permGrades: "Noter et corriger", permPanel: "Voir le tableau", permsSaved: "Permissions enregistrées", submitPh: "Colle ton travail ou un lien…", newActivity: "Nouveauté" },
    de: { cloud: "Cloud", onlineClasses: "Online-Klassen", thisDevice: "Auf diesem Gerät", cloudOff: "Cloud-Sync ist aus. Füge deine Firebase-Schlüssel hinzu.", signInToSync: "Melde dich an, um zu synchronisieren.", signIn: "Anmelden", createAccount: "Konto erstellen", guestBtn: "Als Gast fortfahren", emailAddr: "E-Mail", passwd: "Passwort", logoutBtn: "Abmelden", needAuth: "Melde dich zuerst an.", onlineLabel: "Online-Klasse (wird synchronisiert)", cloudAcc: "Cloud-Konto", signedInCloud: "Angemeldet", cloudCreated: "Online-Klasse erstellt. Code: ", cloudJoined: "Beigetreten: ", noNet: "Keine Verbindung zur Cloud.", delClass: "Klasse löschen", delClassConfirm: "Diese Online-Klasse für alle löschen?", classDeleted: "Online-Klasse gelöscht", announceHw: "Auch in Mitteilungen posten", hwBadge: "Hausaufgabe", authTitle: "Willkommen zurück", authSub: "Melde dich an, um deine Klassen zu synchronisieren.", orWord: "oder", authNote: "Deine Klassen bleiben privat. Wir verkaufen keine Daten.", legal: "Rechtliches", legalSub: "Bedingungen, Datenschutz und Cookies.", termsBtn: "Nutzungsbedingungen", privBtn: "Datenschutzerklärung", cookieBtn: "Cookie-Richtlinie", closeBtn: "Schließen", updates: "Updates", updatesSub: "Die App aktualisiert sich selbst. Updates sind Pflicht.", checkUpdates: "Nach Updates suchen", checkingUpdates: "Suche nach Updates…", upToDate: "Du bist auf dem neuesten Stand", downloadingUpdate: "Pflicht-Update wird heruntergeladen…", updateError: "Updates konnten nicht geprüft werden", tabStream: "Stream", tabClasswork: "Aufgaben", tabPeople: "Personen", emailWord: "E-Mail", bioWord: "Bio", statusWord: "Status", guestWord: "Gast", grades: "Noten", yourAverage: "Dein Schnitt", setGrades: "Benoten", notGraded: "Ohne Note", gradeRange: "Note muss zwischen 0 und {m} liegen", gradesSaved: "Noten gespeichert", pin: "Anheften", unpin: "Lösen", pinBadge: "Angeheftet", comments: "Kommentare", noComments: "Noch keine Kommentare", commentBtn: "Senden", commentPh: "Schreib einen Kommentar…", dueSoon: "Fällig bald", panel: "Dashboard", submissions: "Abgaben", submit: "Abgeben", yourSubmission: "Deine Abgabe", feedback: "Feedback", submitted: "Abgegeben", noSubmissions: "Noch keine Abgaben", classAverage: "Klassenschnitt", tasks: "Aufgaben", linkWarnTitle: "Externer Link", linkWarnMsg: "Links werden nicht von Student's Class geprüft. Öffnen auf eigenes Risiko.", visitLink: "Link besuchen", perms: "Berechtigungen", permsSub: "Was dieses Mitglied in dieser Klasse darf.", permAnnounce: "Mitteilungen erstellen", permHomework: "Aufgaben erstellen", permGrades: "Benoten und Feedback", permPanel: "Dashboard sehen", permsSaved: "Berechtigungen gespeichert", submitPh: "Füge deine Arbeit oder einen Link ein…", newActivity: "Neuigkeit" }
  };
  function mergeExtra() {
    try {
      // NOTE: app.js declares I18N with const, which does NOT attach to window,
      // so we must test the bare identifier instead of window.I18N.
      if (typeof I18N === "undefined") return false;
      Object.keys(EXTRA).forEach(l => { if (I18N[l]) Object.assign(I18N[l], EXTRA[l]); });
      return true;
    } catch (e) { return false; }
  }
  if (!mergeExtra()) {
    // app.js not parsed yet — retry until it is (max ~5s), then give up silently
    let tries = 0;
    const timer = setInterval(() => {
      if (mergeExtra() || ++tries > 50) clearInterval(timer);
    }, 100);
  }

  const CODE_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const rndCode = () => Array.from({ length: 6 }, () => CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)]).join("");
  const toDate = (v) => {
    if (!v) return null;
    if (v.toDate) { try { return v.toDate(); } catch (e) { return null; } }
    const d = new Date(v);
    return isNaN(d.getTime()) ? null : d;
  };
  const fmtDT = (v) => {
    const d = toDate(v);
    if (!d) return (typeof t === "function" ? t("noDueDate") : "No due date");
    try { return d.toLocaleString(typeof locale === "function" ? locale() : undefined, { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }); }
    catch (e) { return d.toLocaleString(); }
  };

  const Cloud = {
    configured: false, ready: false, user: null,
    db: null, auth: null,
    cloudClasses: [],          // merged owned + member class docs
    detail: null,              // { cls, members, posts, assignments }
    ui: { tab: "stream" },
    expanded: {},              // "p:<id>" / "a:<id>" -> true when comments shown
    cCache: {},                // "p:<id>" / "a:<id>" -> [comments] (fetched on demand)
    _unsubs: [], _detailUnsubs: []
  };
  window.Cloud = Cloud;

  function cfg() { return window.FIREBASE_CONFIG || null; }
  function isFilled(c) {
    return c && c.apiKey && c.projectId && c.authDomain
      && !String(c.apiKey).includes("PASTE");
  }

  Cloud.init = function () {
    mergeExtra();
    const c = cfg();
    if (typeof firebase === "undefined" || !isFilled(c)) {
      Cloud.configured = false;
      updateBtn();
      return; // stay local-only
    }
    try {
      if (!firebase.apps.length) firebase.initializeApp(c);
      Cloud.auth = firebase.auth();
      Cloud.db = firebase.firestore();
      Cloud.configured = true;
      Cloud.auth.onAuthStateChanged((u) => {
        Cloud.user = u || null;
        Cloud.ready = !!u;
        if (u) startLists(); else stopLists();
        updateBtn();
        try { if (typeof render === "function") render(); } catch (e) {}
      }, () => { updateBtn(); });
    } catch (e) {
      Cloud.configured = false;
    }
    updateBtn();
  };

  function updateBtn() {
    const b = document.getElementById("cloudBtn");
    if (!b) return;
    if (!Cloud.configured) { b.textContent = "○"; b.title = "Cloud off"; b.classList.remove("on"); }
    else if (!Cloud.user) { b.textContent = "◌"; b.title = "Cloud: signed out"; b.classList.remove("on"); }
    else { b.textContent = "●"; b.title = "Cloud: online"; b.classList.add("on"); }
  }

  function stopLists() {
    Cloud._unsubs.forEach(u => { try { u(); } catch (e) {} });
    Cloud._unsubs = [];
    Cloud.cloudClasses = [];
    Cloud.unread = {};
    clearInterval(Cloud._pollTimer);
    Cloud.closeDetail();
  }

  function startLists() {
    stopLists();
    const uid = Cloud.user.uid;
    const map = new Map();
    const merge = () => {
      Cloud.cloudClasses = [...map.values()].sort((a, b) => {
        const da = toDate(a.createdAt), db = toDate(b.createdAt);
        return (db || 0) - (da || 0);
      });
      try { if (typeof render === "function" && window.__sc_state_route !== "cloud") render(); } catch (e) {}
      updateBtn();
    };
    try {
      const q1 = Cloud.db.collection("classes").where("ownerUid", "==", uid)
        .onSnapshot(s => {
          s.docChanges().forEach(ch => {
            const d = { id: ch.doc.id, ...ch.doc.data() };
            if (ch.type === "removed") map.delete(d.id); else map.set(d.id, d);
          });
          merge();
        }, () => {});
      const q2 = Cloud.db.collection("classes").where("memberUids", "array-contains", uid)
        .onSnapshot(s => {
          s.docChanges().forEach(ch => {
            const d = { id: ch.doc.id, ...ch.doc.data() };
            if (ch.type === "removed") {
              // keep if owned (covered by q1)
              if (d.ownerUid !== uid) map.delete(d.id);
            } else map.set(d.id, d);
          });
          merge();
        }, () => {});
      Cloud._unsubs.push(q1, q2);
      // Background poll for new activity in closed classes (badges + toast).
      clearInterval(Cloud._pollTimer);
      setTimeout(() => { try { Cloud.pollNew(); } catch (e) {} }, 20000);
      Cloud._pollTimer = setInterval(() => { try { Cloud.pollNew(); } catch (e) {} }, 3 * 60 * 1000);
    } catch (e) {}
  }

  /* ---------- unread tracking + new-activity notifications (1.3.1) ---------- */
  const LS_READ = "sc_read_v1";
  Cloud.read = null;   // { cid: {p,a,fb,g:{aid:val},init} }
  Cloud.unread = {};   // { cid: n }
  Cloud._pollTimer = null;
  function readStore() {
    if (!Cloud.read) { try { Cloud.read = JSON.parse(localStorage.getItem(LS_READ) || "{}") || {}; } catch (e) { Cloud.read = {}; } }
    return Cloud.read;
  }
  function saveRead() { try { localStorage.setItem(LS_READ, JSON.stringify(Cloud.read || {})); } catch (e) {} }
  function tsOf(v) {
    const d = (v && v.toDate) ? v.toDate() : new Date(v);
    const x = d ? d.getTime() : 0;
    return isNaN(x) ? 0 : x;
  }
  function isViewing(cid) {
    try { return state.route === "cloud" && state.classId === cid; }
    catch (e) { return window.__sc_state_route === "cloud"; }
  }
  function paintBadges() {
    try {
      $$("[data-cbadge]").forEach(el => {
        const n = Cloud.unread[el.dataset.cbadge] || 0;
        el.textContent = n > 99 ? "99+" : String(n);
        el.style.display = n > 0 ? "" : "none";
      });
    } catch (e) {}
  }
  // Pure diff of fetched data vs read markers (no side effects except grades map).
  function diffClassNews(cid, posts, assigns, mySubs, meUid) {
    const store = readStore();
    const r = store[cid] || (store[cid] = { p: 0, a: 0, fb: 0, g: {}, init: false });
    let nP = 0, nA = 0, nG = 0, nF = 0, pMax = r.p, aMax = r.a, fbMax = r.fb;
    const myMails = viewerEmails();
    (posts || []).forEach(p => {
      const x = tsOf(p.createdAt); if (x > pMax) pMax = x;
      if (r.init && x > r.p && p.authorUid !== meUid) nP++;
    });
    (assigns || []).forEach(a => {
      const x = tsOf(a.createdAt); if (x > aMax) aMax = x;
      if (r.init && x > r.a && a.createdBy !== meUid) nA++;
      let g = null;
      const gm = a.grades || {};
      for (const em of myMails) {
        if (gm[em] !== undefined && gm[em] !== null && gm[em] !== "") { g = Number(gm[em]); break; }
      }
      if (!r.g) r.g = {};
      if (r.init && g !== null && r.g[a.id] !== g) nG++;
      r.g[a.id] = g;
    });
    (mySubs || []).forEach(s => {
      if (!s.feedback) return;
      const x = tsOf(s.fdate || s.date); if (x > fbMax) fbMax = x;
      if (r.init && x > r.fb) nF++;
    });
    return { nP, nA, nG, nF, pMax, aMax, fbMax };
  }
  function dueCheckCloud(c, assigns) {
    try {
      if (typeof Notification === "undefined" || !Cloud.user) return;
      if (Notification.permission === "denied") return;
      const now = Date.now(), day = new Date().toDateString();
      let seen = {};
      try { seen = JSON.parse(localStorage.getItem("sc_notified_v1") || "{}"); } catch (e) {}
      let changed = false;
      (assigns || []).forEach(a => {
        if ((a.doneBy || []).includes(Cloud.user.uid)) return;
        if (!a.due) return;
        const d = new Date(a.due); if (isNaN(d)) return;
        const ms = d - now;
        if (ms < 0 || ms > 24 * 3600 * 1000) return;
        const key = "cc:" + a.id;
        if (seen[key] === day) return;
        seen[key] = day; changed = true;
        try { new Notification("⏰ " + a.title, { body: t("dueSoon") + " · " + c.name }); } catch (e) {}
      });
      if (changed) { try { localStorage.setItem("sc_notified_v1", JSON.stringify(seen)); } catch (e) {} }
    } catch (e) {}
  }
  // Background poll: silent baseline on first run, badges + one toast afterwards.
  Cloud.pollNew = async function () {
    if (!Cloud.configured || !Cloud.user || !Cloud.db) return;
    const me = Cloud.user.uid;
    const hits = [];
    for (const c of Cloud.cloudClasses.filter(x => !x.archived)) {
      try {
        const [ps, as] = await Promise.all([
          Cloud.db.collection("classes").doc(c.id).collection("posts").orderBy("createdAt", "desc").limit(8).get(),
          Cloud.db.collection("classes").doc(c.id).collection("assignments").orderBy("createdAt", "desc").limit(8).get()
        ]);
        const posts = []; ps.forEach(d => posts.push({ id: d.id, ...d.data() }));
        const assigns = []; as.forEach(d => assigns.push({ id: d.id, ...d.data() }));
        const mySubs = [];
        await Promise.all(assigns.slice(0, 8).map(async a => {
          try {
            const s = await Cloud.db.collection("classes").doc(c.id).collection("assignments").doc(a.id).collection("submissions").doc(me).get();
            if (s.exists) mySubs.push({ id: s.id, ...s.data() });
          } catch (e) {}
        }));
        const store = readStore();
        const r = store[c.id] || (store[c.id] = { p: 0, a: 0, fb: 0, g: {}, init: false });
        const diff = diffClassNews(c.id, posts, assigns, mySubs, me);
        const n = diff.nP + diff.nA + diff.nG + diff.nF;
        if (!r.init) { r.init = true; }
        else if (n > 0 && !isViewing(c.id)) {
          Cloud.unread[c.id] = (Cloud.unread[c.id] || 0) + n;
          hits.push({ name: c.name, n });
        } else if (isViewing(c.id)) { Cloud.unread[c.id] = 0; }
        r.p = diff.pMax; r.a = diff.aMax; r.fb = diff.fbMax;
        dueCheckCloud(c, assigns);
      } catch (e) {}
    }
    saveRead(); paintBadges();
    if (hits.length) {
      const shown = hits.slice(0, 3).map(x => `${x.name} (+${x.n})`).join(", ");
      toast(`🔔 ${t("newActivity")}: ${shown}${hits.length > 3 ? "…" : ""}`, true);
    }
  };
  // Scan of the OPEN class from live snapshots: silent, clears badges while viewing.
  Cloud.scanOpen = function () {
    const d = Cloud.detail;
    if (!d || !d.cls || !Cloud.user || !isViewing(d.cls.id)) return;
    const cid = d.cls.id, me = Cloud.user.uid;
    const mySubs = [];
    Object.values(Cloud.subs || {}).forEach(arr => (arr || []).forEach(s => { if (s.id === me) mySubs.push(s); }));
    const diff = diffClassNews(cid, d.posts, d.assignments, mySubs, me);
    const store = readStore();
    const r = store[cid];
    if (!r.init) r.init = true;
    r.p = diff.pMax; r.a = diff.aMax; r.fb = diff.fbMax;
    Cloud.unread[cid] = 0;
    saveRead(); paintBadges();
  };

  /* ---------- auth ---------- */
  function authError(msg) {
    const box = document.getElementById("clError");
    if (box) { box.textContent = msg; box.hidden = false; box.classList.remove("shake"); void box.offsetWidth; box.classList.add("shake"); }
    else toast(msg);
  }
  Cloud.openAuth = function () {
    if (!Cloud.configured) { toast(t("cloudOff")); return; }
    if (Cloud.user) { try { state.route = "settings"; render(); } catch (e) {} return; }
    openModal(`
      <div class="auth-wrap">
        <img src="logo.svg" alt="Student's Class logo" class="auth-logo" />
        <h2>${t("authTitle")}</h2>
        <p class="muted">${t("authSub")}</p>
        <p class="form-error" id="clError" hidden></p>
        <div class="auth-fields">
          <label>${t("emailAddr")}</label><input id="clEmail" type="email" placeholder="you@gmail.com" autocomplete="email" />
          <label>${t("passwd")}</label><input id="clPass" type="password" placeholder="••••••••" autocomplete="current-password" />
        </div>
        <div class="btn-row auth-main">
          <button class="btn primary" id="clLogin">${t("signIn")}</button>
          <button class="btn" id="clRegister">${t("createAccount")}</button>
        </div>
        <div class="auth-div"><span>${t("orWord")}</span></div>
        <button class="btn block" id="clGuest">${t("guestBtn")}</button>
        <button class="btn quiet" id="cancelModal">${t("cancelBtn")}</button>
        <p class="auth-note">${t("authNote")}</p>
      </div>`);
    const busy = (on) => { ["clLogin", "clRegister", "clGuest"].forEach(id => { const b = document.getElementById(id); if (b) b.disabled = !!on; }); };
    const creds = () => {
      const email = document.getElementById("clEmail").value.trim();
      const pass = document.getElementById("clPass").value;
      if (!email || !pass) { authError(t("fillAll")); return null; }
      return { email, pass };
    };
    const done = () => { busy(false); closeModal(); toast("✓ " + t("signedInCloud"), true); };
    document.getElementById("clLogin").onclick = async () => {
      const c = creds(); if (!c) return; busy(true);
      try { await Cloud.auth.signInWithEmailAndPassword(c.email, c.pass); done(); }
      catch (e) { busy(false); authError(e.message); }
    };
    document.getElementById("clRegister").onclick = async () => {
      const c = creds(); if (!c) return; busy(true);
      try { await Cloud.auth.createUserWithEmailAndPassword(c.email, c.pass); done(); }
      catch (e) { busy(false); authError(e.message); }
    };
    document.getElementById("clGuest").onclick = async () => {
      busy(true);
      try { await Cloud.auth.signInAnonymously(); done(); }
      catch (e) { busy(false); authError(e.message); }
    };
    document.getElementById("clPass").addEventListener("keydown", (e) => {
      if (e.key === "Enter") document.getElementById("clLogin").click();
    });
  };

  Cloud.logout = async function () {
    try { await Cloud.auth.signOut(); toast(t("logoutBtn")); } catch (e) { toast(e.message); }
  };

  /* ---------- classes ---------- */
  async function uniqueCode() {
    for (let i = 0; i < 6; i++) {
      const code = rndCode();
      const s = await Cloud.db.collection("classes").where("code", "==", code).limit(1).get();
      if (s.empty) return code;
    }
    return rndCode();
  }

  function memberProfile() {
    const p = (typeof profile !== "undefined" && profile) ? profile : { firstName: "?", lastName: "", email: Cloud.user.email || "guest", role: "student" };
    return { email: p.email || Cloud.user.email || t("guestWord"), firstName: p.firstName || "", lastName: p.lastName || "", role: p.role || "student", pfp: p.pfp || null };
  }
  /* Best-effort: push current local name/photo into every cloud class where you are a member */
  Cloud.syncProfile = async function () {
    if (!Cloud.configured || !Cloud.user || !Cloud.db) return;
    try {
      const mp = memberProfile();
      const snap = await Cloud.db.collection("classes").where("memberUids", "array-contains", Cloud.user.uid).get();
      const jobs = [];
      snap.forEach(d => { jobs.push(d.ref.collection("members").doc(Cloud.user.uid).set({ ...mp, joinedAt: new Date().toISOString() }, { merge: true })); });
      await Promise.all(jobs);
    } catch (e) { /* offline or rules — ignore, photo still works locally */ }
  };

  Cloud.createCloudClass = async function (d) {
    if (!Cloud.ready) { toast(t("needAuth")); return null; }
    const code = await uniqueCode();
    const mp = memberProfile();
    const ref = Cloud.db.collection("classes").doc();
    await ref.set({
      name: d.name, subject: d.subject || "", section: d.section || "", room: d.room || "",
      description: d.description || "", color: d.color || "banner-1", code,
      ownerUid: Cloud.user.uid, ownerEmail: mp.email,
      teacherName: (mp.firstName + " " + mp.lastName).trim(),
      memberUids: [Cloud.user.uid], perms: {}, archived: false,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    await ref.collection("members").doc(Cloud.user.uid).set({ ...mp, joinedAt: new Date().toISOString() });
    return { id: ref.id, code };
  };

  Cloud.joinCloudClass = async function (code) {
    if (!Cloud.ready) { toast(t("needAuth")); return null; }
    code = String(code || "").trim().toUpperCase();
    const s = await Cloud.db.collection("classes").where("code", "==", code).limit(1).get();
    if (s.empty) return null;
    const ref = s.docs[0].ref;
    const mp = memberProfile();
    await ref.collection("members").doc(Cloud.user.uid).set({ ...mp, joinedAt: new Date().toISOString() }, { merge: true });
    try {
      await ref.update({ memberUids: firebase.firestore.FieldValue.arrayUnion(Cloud.user.uid) });
    } catch (e) { /* owner-only rule path: member doc is enough */ }
    return { id: ref.id, ...(s.docs[0].data()) };
  };

  Cloud.openClass = function (id) {
    try { state.route = "cloud"; state.classId = id; } catch (e) { window.__sc_state_route = "cloud"; }
    window.__sc_state_route = "cloud";
    Cloud.ui.tab = "stream";
    Cloud.expanded = {}; Cloud.cCache = {}; Cloud.subs = {}; Cloud.subsReady = null; Cloud.subsFetching = false;
    Cloud.unread[id] = 0; paintBadges();
    subscribeDetail(id);
    try { render(); } catch (e) {}
  };

  Cloud.closeDetail = function () {
    Cloud._detailUnsubs.forEach(u => { try { u(); } catch (e) {} });
    Cloud._detailUnsubs = [];
    Cloud.detail = null;
  };

  function subscribeDetail(id) {
    Cloud.closeDetail();
    const db = Cloud.db;
    const doc = db.collection("classes").doc(id);
    Cloud._detailUnsubs.push(doc.onSnapshot(s => {
      if (!s.exists) { Cloud.detail = null; }
      else Cloud.detail = { ...(Cloud.detail || {}), cls: { id: s.id, ...s.data() } };
      if (window.__sc_state_route === "cloud") { try { render(); } catch (e) {} }
    }));
    Cloud._detailUnsubs.push(doc.collection("members").onSnapshot(s => {
      const m = []; s.forEach(d => m.push({ uid: d.id, ...d.data() }));
      Cloud.detail = { ...(Cloud.detail || {}), members: m };
      if (window.__sc_state_route === "cloud") { try { render(); } catch (e) {} }
    }));
    Cloud._detailUnsubs.push(doc.collection("posts").orderBy("createdAt", "desc").limit(60).onSnapshot(s => {
      const p = []; s.forEach(d => p.push({ id: d.id, ...d.data() }));
      Cloud.detail = { ...(Cloud.detail || {}), posts: p };
      try { Cloud.scanOpen(); } catch (e) {}
      if (window.__sc_state_route === "cloud") { try { render(); } catch (e) {} }
    }));
    Cloud._detailUnsubs.push(doc.collection("assignments").orderBy("createdAt", "desc").limit(100).onSnapshot(s => {
      const a = []; s.forEach(d => a.push({ id: d.id, ...d.data() }));
      Cloud.detail = { ...(Cloud.detail || {}), assignments: a };
      try { Cloud.scanOpen(); } catch (e) {}
      if (window.__sc_state_route === "cloud") { try { render(); } catch (e) {} }
    }));
  }

  // Called after every app render: entering/leaving the cloud view.
  Cloud.onRoute = function () {
    try { window.__sc_state_route = state.route; } catch (e) {}
    if (!window.__sc_state_route || window.__sc_state_route !== "cloud") {
      if (Cloud.detail) Cloud.closeDetail();
    } else if (window.__sc_state_route === "cloud" && state.classId && (!Cloud.detail || !Cloud.detail.cls || Cloud.detail.cls.id !== state.classId)) {
      subscribeDetail(state.classId);
    }
    updateBtn();
  };

  Cloud.isOwner = function (cls) {
    return !!(Cloud.user && cls && cls.ownerUid === Cloud.user.uid);
  };
  /* Cloud perms live on the class doc: { uid: ["announce","homework","grades","panel"] } */
  const CPERMS = ["announce", "homework", "grades", "panel"];
  function ccPerms(cls) {
    if (Cloud.isOwner(cls)) return [...CPERMS];
    if (!cls || !Cloud.user) return [];
    return (((cls.perms || {})[Cloud.user.uid]) || []).filter(p => CPERMS.includes(p));
  }
  function ccCan(cls, perm) { return Cloud.isOwner(cls) || ccPerms(cls).includes(perm); }
  function ccOpenPermsModal(cls) {
    if (!Cloud.isOwner(cls)) { toast(t("onlyOwner")); return; }
    const members = (Cloud.detail && Cloud.detail.members) || [];
    const perms = cls.perms || {};
    openModal(`<h2>${t("perms")}</h2><p class="muted">${t("permsSub")}</p>
      <div class="grade-list">
      ${members.filter(m => m.uid !== cls.ownerUid).map(m => {
        const cur = perms[m.uid] || [];
        return `<div style="padding:8px 4px;border-bottom:1px solid var(--border)"><strong>${esc((m.firstName || "") + " " + (m.lastName || ""))}</strong><div class="muted" style="font-size:12px">${esc(m.email)}</div>
          <div class="btn-row" style="margin-top:6px">${CPERMS.map(p => `<label class="checkline" style="margin:0"><input type="checkbox" data-ccperm="${m.uid}:${p}" ${cur.includes(p) ? "checked" : ""} /> ${t({ announce: "permAnnounce", homework: "permHomework", grades: "permGrades", panel: "permPanel" }[p])}</label>`).join("")}</div></div>`;
      }).join("") || `<p class="muted">${t("membersTitle")} (1)</p>`}
      </div>
      <div class="btn-row" style="margin-top:14px"><button class="btn primary" id="ccDoPerms">${t("saveBtn")}</button><button class="btn" id="cancelModal">${t("cancelBtn")}</button></div>`);
    document.getElementById("ccDoPerms").onclick = async () => {
      const next = { ...(cls.perms || {}) };
      members.filter(m => m.uid !== cls.ownerUid).forEach(m => {
        const picked = CPERMS.filter(p => document.querySelector(`[data-ccperm="${m.uid}:${p}"]`)?.checked);
        if (picked.length) next[m.uid] = picked; else delete next[m.uid];
      });
      await Cloud.db.collection("classes").doc(cls.id).update({ perms: next });
      closeModal(); toast(t("permsSaved"), true);
    };
  }

  function normE(e) { return String(e || "").trim().toLowerCase(); }
  function viewerEmails() {
    const out = [];
    try { if (typeof profile !== "undefined" && profile && profile.email) out.push(normE(profile.email)); } catch (e) {}
    if (Cloud.user && Cloud.user.email) out.push(normE(Cloud.user.email));
    return out;
  }
  function viewerGrade(a) {
    const g = a.grades || {};
    for (const em of viewerEmails()) {
      if (g[em] !== undefined && g[em] !== null && g[em] !== "") return Number(g[em]);
    }
    return null;
  }
  function viewerAverage(assigns) {
    let sum = 0, n = 0;
    (assigns || []).forEach(a => {
      if (!(a.points > 0)) return;
      const g = viewerGrade(a);
      if (g === null || isNaN(g)) return;
      sum += (g / a.points) * 10; n++;
    });
    return n ? { avg: sum / n, n } : null;
  }
  function sortedPosts(posts) {
    return [...(posts || [])].sort((x, y) => {
      const px = x.pinned ? 1 : 0, py = y.pinned ? 1 : 0;
      if (px !== py) return py - px;
      const dx = x.createdAt && x.createdAt.toDate ? x.createdAt.toDate() : new Date(x.createdAt);
      const dy = y.createdAt && y.createdAt.toDate ? y.createdAt.toDate() : new Date(y.createdAt);
      return dy - dx;
    });
  }
  async function fetchCcSubs(clsId, aids) {
    Cloud.subs = Cloud.subs || {};
    await Promise.all((aids || []).map(async aid => {
      try {
        const s = await Cloud.db.collection("classes").doc(clsId).collection("assignments").doc(aid).collection("submissions").get();
        const out = [];
        s.forEach(d => out.push({ id: d.id, ...d.data() }));
        Cloud.subs[aid] = out;
      } catch (e) { Cloud.subs[aid] = []; }
    }));
    Cloud.subsReady = clsId;
    try { Cloud.scanOpen(); } catch (e) {}
    try { render(); } catch (e) {}
  }
  function ccClassAverage(assigns) {
    let sum = 0, n = 0;
    (assigns || []).forEach(a => {
      if (!(a.points > 0)) return;
      Object.values(a.grades || {}).forEach(g => {
        const v = Number(g);
        if (!isNaN(v)) { sum += (v / a.points) * 10; n++; }
      });
    });
    return n ? { avg: sum / n, n } : null;
  }
  function ccPanelHTML(c, assigns, members, canP) {
    if (!canP) return `<div class="empty">${t("onlyOwner")}</div>`;
    if (Cloud.subsReady !== c.id) {
      return `<div class="empty">${t("checkingUpdates")}</div>`;
    }
    const avg = ccClassAverage(assigns);
    let totalSubs = 0;
    (assigns || []).forEach(a => { totalSubs += ((Cloud.subs || {})[a.id] || []).length; });
    return `<div class="card stat-row">
        <div class="stat"><strong>${members.length}</strong><span>${t("membersTitle").toLowerCase()}</span></div>
        <div class="stat"><strong>${(assigns || []).length}</strong><span>${t("tasks").toLowerCase()}</span></div>
        <div class="stat"><strong>${totalSubs}</strong><span>${t("submissions").toLowerCase()}</span></div>
        <div class="stat"><strong>${avg ? "★ " + avg.avg.toFixed(1) : "–"}</strong><span>${t("classAverage").toLowerCase()}</span></div>
      </div>`
      + ((assigns || []).length ? assigns.map(a => {
        const subs = (Cloud.subs || {})[a.id] || [];
        const gvals = Object.values(a.grades || {}).map(Number).filter(v => !isNaN(v));
        return `<div class="card" style="margin-top:12px"><h3>${esc(a.title)}</h3>
          <p class="muted" style="margin:0 0 8px">📥 ${subs.length} ${t("submissions").toLowerCase()}${gvals.length ? ` · ★ ${(gvals.reduce((s, v) => s + v, 0) / gvals.length).toFixed(1)}/${a.points || 0}` : ""}</p>
          ${subs.length ? subs.map(s => {
            const g = (a.grades || {})[s.id];
            return `<div class="person-row" style="align-items:flex-start"><div class="mini-avatar">${esc(((s.name || "?")[0]) || "?")}</div><div style="flex:1"><strong>${esc(s.name || s.email || "?")}</strong><div class="muted" style="font-size:12px">${g !== undefined ? `★ ${g}/${a.points || 0}` : t("notGraded")}</div><p style="margin:4px 0">${fmtRich(s.text)}</p>
              <div class="cinput-row"><input type="text" data-ccfbinput="${a.id}:${s.id}" placeholder="${t("feedback")}…" value="${esc(s.feedback || "")}" maxlength="1000" /><button class="btn small" data-ccfbsend="${a.id}:${s.id}">${t("saveBtn")}</button></div></div></div>`;
          }).join("") : `<p class="muted">${t("noSubmissions")}</p>`}
        </div>`;
      }).join("") : `<div class="empty" style="margin-top:12px">${t("noHw")}</div>`);
  }
  /* Comments fetched on demand (no listener explosion) */
  async function loadCcComments(kind, id) {
    const key = kind + ":" + id;
    const clsId = Cloud.detail && Cloud.detail.cls && Cloud.detail.cls.id;
    if (!clsId) return;
    const coll = kind === "p" ? "posts" : "assignments";
    try {
      const s = await Cloud.db.collection("classes").doc(clsId).collection(coll).doc(id).collection("comments").orderBy("createdAt", "asc").limit(100).get();
      const out = [];
      s.forEach(d => out.push({ id: d.id, ...d.data() }));
      Cloud.cCache[key] = out;
    } catch (e) { Cloud.cCache[key] = []; }
    try { render(); } catch (err) {}
  }
  function ccCommentsHTML(kind, id) {
    const key = kind + ":" + id;
    if (!Cloud.expanded[key]) {
      return `<button class="cc-toggle" data-cc-comments="${key}">💬 ${t("comments")}</button><div id="ccbox-${kind}-${id}"></div>`;
    }
    const list = Cloud.cCache[key];
    const inner = !list
      ? `<p class="muted" style="font-size:12.5px">…</p>`
      : (list.length ? list.map(cm => {
        const pic = cm.authorPfp || null;
        const av = pic ? `<div class="mini-avatar sm"><img src="${pic}" alt="avatar"/></div>` : `<div class="mini-avatar sm">${esc(((cm.authorName || "?")[0]) || "?")}</div>`;
        let dstr = "";
        try { dstr = (cm.createdAt && cm.createdAt.toDate ? cm.createdAt.toDate() : new Date(cm.createdAt)).toLocaleString(typeof locale === "function" ? locale() : undefined); } catch (e) {}
        return `<div class="comment">${av}<div class="comment-body"><strong>${esc(cm.authorName || "?")}</strong><span class="muted"> · ${esc(dstr)}</span><p>${fmtRich(cm.text)}</p></div></div>`;
      }).join("") : `<p class="muted" style="font-size:12.5px;margin:6px 0">${t("noComments")}</p>`);
    return `<button class="cc-toggle" data-cc-comments="${key}">💬 ${t("comments")} ▲</button>
      <div class="comments" id="ccbox-${kind}-${id}">${inner}
      <div class="cinput-row"><input type="text" data-ccinput="${key}" placeholder="${esc(t("commentPh"))}" maxlength="500" /><button class="btn small" data-cc-send="${key}">${t("commentBtn")}</button></div></div>`;
  }

  /* ---------- cloud home section ---------- */
  Cloud.homeHTML = function () {
    if (!Cloud.configured) return "";
    if (!Cloud.user) {
      return `<div class="card" style="margin-bottom:16px"><h3>☁ ${t("cloud")}</h3>
        <p class="muted">${t("signInToSync")}</p>
        <div class="btn-row"><button class="btn primary" id="cloudSign">${t("signIn")}</button></div></div>`;
    }
    const list = Cloud.cloudClasses.filter(c => !c.archived);
    return `<div class="page-head" style="margin-top:4px"><div><h1 style="font-size:19px">☁ ${t("onlineClasses")} (${list.length})</h1></div></div>` +
      (list.length
        ? `<div class="grid" style="margin-bottom:18px">${list.map(c => `
          <div class="class-card" data-cloud-open="${c.id}">
            <div class="class-banner" style="${bannerStyle(c.color)}"><h3>${esc(c.name)}</h3><small>${esc([c.subject, c.section].filter(Boolean).join(" · ")) || "&nbsp;"}</small></div>
            <div class="class-body"><p>☁ ${esc(c.code)} · ${esc(c.teacherName || "")}</p><span class="cbadge" data-cbadge="${c.id}" style="display:none"></span><span class="muted">›</span></div>
          </div>`).join("")}</div>`
        : `<div class="empty" style="margin-bottom:18px">${t("noClassesSub")}</div>`) +
      `<div class="page-head"><div><h1 style="font-size:19px">💻 ${t("thisDevice")}</h1></div></div>`;
  };

  Cloud.archivedExtra = function () {
    if (!Cloud.configured || !Cloud.user) return "";
    const list = Cloud.cloudClasses.filter(c => c.archived);
    if (!list.length) return "";
    return `<div class="page-head" style="margin-top:18px"><div><h1 style="font-size:19px">☁ ${t("onlineClasses")}</h1></div></div>
      <div class="grid">${list.map(c => `
        <div class="class-card" data-cloud-open="${c.id}">
          <div class="class-banner" style="${bannerStyle(c.color)}"><h3>${esc(c.name)}</h3><small>${esc(c.code)}</small></div>
          <div class="class-body"><p>☁ ${esc(c.teacherName || "")}</p><span class="muted">›</span></div>
        </div>`).join("")}</div>`;
  };

  /* ---------- cloud settings card ---------- */
  Cloud.accountCardHTML = function () {
    if (!Cloud.configured) {
      return `<div class="card" style="margin-bottom:16px"><h3>☁ ${t("cloudAcc")}</h3>
        <p class="muted">${t("cloudOff")}</p></div>`;
    }
    if (!Cloud.user) {
      return `<div class="card" style="margin-bottom:16px"><h3>☁ ${t("cloudAcc")}</h3>
        <p class="muted">${t("signInToSync")}</p>
        <div class="btn-row"><button class="btn primary" id="cloudSign2">${t("signIn")}</button></div></div>`;
    }
    const u = Cloud.user;
    return `<div class="card" style="margin-bottom:16px"><h3>☁ ${t("cloudAcc")}</h3>
      <dl class="kv"><dt>${t("emailWord")}</dt><dd>${esc(u.email || t("guestWord"))}</dd><dt>${t("statusWord")}</dt><dd>● ${t("signedInCloud")}</dd></dl>
      <div class="btn-row" style="margin-top:12px"><button class="btn small" id="cloudLogout">${t("logoutBtn")}</button></div></div>`;
  };

  /* ---------- cloud class detail view ---------- */
  Cloud.viewClass = function () {
    const d = Cloud.detail;
    if (!d || !d.cls) return `<div class="empty">${t("noNet")}</div>`;
    const c = d.cls;
    const owner = Cloud.isOwner(c);
    const canA = ccCan(c, "announce"), canH = ccCan(c, "homework"), canG = ccCan(c, "grades"), canP = ccCan(c, "panel");
    const members = d.members || [], posts = d.posts || [], assigns = d.assignments || [];
    const tab = Cloud.ui.tab || "stream";
    if ((tab === "classwork" || tab === "panel") && Cloud.subsReady !== c.id && !Cloud.subsFetching) {
      Cloud.subsFetching = true;
      fetchCcSubs(c.id, assigns.map(a => a.id)).finally(() => { Cloud.subsFetching = false; });
    }
    const pending = assigns.filter(a => !(a.doneBy || []).includes(Cloud.user.uid)).length;
    let body = "";
    if (tab === "stream") {
      body = `<div class="two-col">
        <div class="card"><h3>${t("codeTitle")}</h3><p class="muted">${t("shareCode")}</p>
          <div style="font-size:24px;font-weight:700;letter-spacing:.12em">${esc(c.code)}</div>
          <div class="btn-row" style="margin-top:10px"><button class="btn small" id="ccCopy">${t("copyCode")}</button>
          ${owner
            ? `<button class="btn small" id="ccArch">${c.archived ? t("unarchiveBtn") : t("archiveBtn")}</button><button class="btn small danger" id="ccDel">${t("delClass")}</button>`
            : `<button class="btn small" id="ccLeave">${t("leaveBtn")}</button>`}</div>
          <hr style="border:0;border-top:1px solid var(--border);margin:14px 0" />
          <h3>${t("aboutTitle")}</h3><p class="muted">${esc(c.description || t("noDesc"))}</p>
          <p class="muted">${esc(c.room || "-")} · ${members.length} ${t("membersWord")}</p></div>
        <div>
          ${(canA || canH) ? `<div class="btn-row" style="margin-bottom:12px">${canA ? `<button class="btn primary" id="ccPost">${t("newAnnounceBtn")}</button>` : ""}${canH ? `<button class="btn" id="ccAssign">${t("newHwBtn")}</button>` : ""}</div>` : `<p class="muted" style="margin:0 0 12px">${t("onlyOwner")}</p>`}
          ${posts.length ? sortedPosts(posts).map(p => {
            const m = members.find(x => (x.email || "").toLowerCase() === String(p.authorEmail || "").toLowerCase());
            const pic = (m && m.pfp) || p.authorPfp || null;
            const av = pic ? `<div class="mini-avatar"><img src="${pic}" alt="avatar"/></div>` : `<div class="mini-avatar">${esc((p.authorName || "?")[0] || "?")}</div>`;
            const hw = p.kind === "hw";
            return `<div class="post${p.pinned ? " pinned" : ""}"><div class="post-head">${av}<div><strong>${esc(p.authorName || "?")}</strong><div class="muted" style="font-size:12px">${esc(fmtDT(p.createdAt))}</div></div>${p.pinned ? `<span class="hw-badge">📌 ${t("pinBadge")}</span>` : ""}${hw ? `<span class="hw-badge">✏ ${t("hwBadge")}</span>` : ""}${canA ? `<button class="icon-btn sm pin-btn" data-cc-pin="${p.id}" title="${p.pinned ? t("unpin") : t("pin")}">${p.pinned ? "📌" : "📍"}</button>` : ""}</div>${hw ? `<p style="margin:6px 0 2px"><strong>${esc(p.hwTitle || "")}</strong></p>${p.hwDue ? `<p class="muted" style="margin:0 0 4px;font-size:13px">${esc(fmtDT(p.hwDue))}</p>` : ""}` : ""}<p style="margin:6px 0 0">${fmtRich(p.text)}</p>${ccCommentsHTML("p", p.id)}</div>`;
          }).join("") : `<div class="empty">${t("noAnnounce")}</div>`}
        </div></div>`;
    } else if (tab === "classwork") {
      const avg = viewerAverage(assigns);
      body = `${canH ? `<div class="btn-row" style="margin-bottom:12px"><button class="btn primary" id="ccAssign">${t("newHwBtn")}</button></div>` : `<p class="muted" style="margin:0 0 12px">${t("onlyOwner")}</p>`}
      ${avg ? `<div class="card avg-card"><strong>★ ${t("yourAverage")}: ${avg.avg.toFixed(1)}</strong><span class="muted"> · ${avg.n} ${t("grades").toLowerCase()}</span></div>` : ""}
      ${assigns.length ? assigns.map(a => {
        const done = (a.doneBy || []).includes(Cloud.user.uid);
        const g = viewerGrade(a);
        const mySub = ((Cloud.subs || {})[a.id] || []).find(s => s.id === Cloud.user.uid);
        const gvals = Object.values(a.grades || {}).map(Number).filter(v => !isNaN(v));
        return `<div class="assign ${done ? "done" : ""}">
          <div class="assign-head"><div style="flex:1"><strong>${esc(a.title)}</strong><div class="muted" style="font-size:13px">${esc(a.due ? fmtDT(a.due) : t("noDueDate"))} · ${a.points || 0} ${t("pts")}</div></div>
          ${g !== null ? `<span class="grade-chip">★ ${g}/${a.points || 0}</span>` : ((a.points > 0) ? `<span class="grade-chip dim">${t("notGraded")}</span>` : "")}
          <button class="btn small" data-cc-toggle="${a.id}">${done ? t("reopenBtn") : t("markDone")}</button>
          ${canG ? `<button class="btn small" data-cc-grade="${a.id}">${t("setGrades")}</button>` : ""}${canH ? `<button class="btn small danger" data-cc-delassign="${a.id}">${t("deleteBtn")}</button>` : ""}</div>
          ${a.desc ? `<p style="margin:6px 0 0">${fmtRich(a.desc)}</p>` : ""}
          ${canG
            ? `<p class="muted" style="font-size:12.5px;margin:6px 0 0">📥 ${((Cloud.subs || {})[a.id] || []).length} ${t("submissions").toLowerCase()}${gvals.length ? ` · ★ ${(gvals.reduce((s, v) => s + v, 0) / gvals.length).toFixed(1)}/${a.points || 0}` : ""}</p>`
            : `<div class="sub-box">${mySub ? `<div class="sub-prev"><strong>${t("yourSubmission")}</strong><p>${fmtRich(mySub.text)}</p>${mySub.feedback ? `<div class="feedback"><strong>${t("feedback")}:</strong> ${fmtRich(mySub.feedback)}</div>` : ""}</div>` : ""}
              <div class="cinput-row"><input type="text" data-ccsubinput="${a.id}" placeholder="${esc(t("submitPh"))}" maxlength="1000" /><button class="btn small primary" data-ccsubsend="${a.id}">${mySub ? t("saveBtn") : t("submit")}</button></div></div>`}
          ${ccCommentsHTML("a", a.id)}</div>`;
      }).join("") : `<div class="empty">${t("noHw")}</div>`}`;
    } else if (tab === "panel") {
      body = ccPanelHTML(c, assigns, members, canP);
    } else {
      const mAv = (m, fb) => m.pfp ? `<div class="mini-avatar"><img src="${m.pfp}" alt="avatar"/></div>` : `<div class="mini-avatar">${esc(fb)}</div>`;
      body = `<div class="card"><h3>${t("teacherWord")}</h3>
        <div class="person-row">${mAv(members.find(x => (x.email || "").toLowerCase() === String(c.ownerEmail || "").toLowerCase()) || {}, (c.teacherName || "?")[0])}<div><strong>${esc(c.teacherName || "")}</strong><div class="muted">${esc(c.ownerEmail || "")}</div></div></div>
        <h3 style="margin-top:16px">${t("membersTitle")} (${members.length})</h3>
        ${members.map(m => {
          const mp = ((c.perms || {})[m.uid] || []).map(p => t({ announce: "permAnnounce", homework: "permHomework", grades: "permGrades", panel: "permPanel" }[p])).filter(Boolean);
          return `<div class="person-row">${mAv(m, ((m.firstName || "")[0] || "?"))}<div style="flex:1"><strong>${esc((m.firstName || "") + " " + (m.lastName || ""))}</strong><div class="muted">${esc(m.email || "")}${mp.length ? ` · 🔑 ${esc(mp.join(", "))}` : ""}</div></div></div>`;
        }).join("")}
        ${owner ? `<div class="btn-row" style="margin-top:12px"><button class="btn small" id="ccPerms">${t("perms")}</button></div>` : ""}</div>`;
    }
    return `<button class="btn small" id="ccBack">‹ ${t("backAll")}</button>
    <div class="banner-hero" style="${bannerStyle(c.color)};margin-top:12px"><h1>☁ ${esc(c.name)}</h1><p>${esc([c.subject, c.section, c.room].filter(Boolean).join(" · "))}</p>
      <div class="class-meta"><span class="chip">${esc(c.code)}</span><span class="chip">${members.length} ${t("membersWord")}</span><span class="chip">${pending} ${t("pendingWord")}</span></div></div>
    <div class="tabs"><button class="tab ${tab === "stream" ? "active" : ""}" data-cc-tab="stream">${t("tabStream")}</button><button class="tab ${tab === "classwork" ? "active" : ""}" data-cc-tab="classwork">${t("tabClasswork")}</button><button class="tab ${tab === "people" ? "active" : ""}" data-cc-tab="people">${t("tabPeople")}</button>${canP ? `<button class="tab ${tab === "panel" ? "active" : ""}" data-cc-tab="panel">📊 ${t("panel")}</button>` : ""}</div>
    ${body}`;
  };

  /* ---------- cloud event bindings (called from app bindCommon) ---------- */
  Cloud.bindCommon = function () {
    const on = (sel, fn) => { const el = $(sel); if (el) el.addEventListener("click", fn); };
    on("#cloudBtn", () => Cloud.openAuth());
    on("#cloudSign", () => Cloud.openAuth());
    on("#cloudSign2", () => Cloud.openAuth());
    on("#cloudLogout", () => Cloud.logout());
    $$("#view [data-cloud-open]").forEach(el => el.onclick = () => Cloud.openClass(el.dataset.cloudOpen));
    $$("#sideClassList [data-cloud-open]").forEach(el => el.onclick = () => { document.body.classList.remove("nav-open"); Cloud.openClass(el.dataset.cloudOpen); });
    if (!Cloud.detail || !Cloud.detail.cls) return;
    const id = Cloud.detail.cls.id;
    const doc = () => Cloud.db.collection("classes").doc(id);
    on("#ccBack", () => { try { state.route = "home"; state.classId = null; render(); } catch (e) {} });
    $$("[data-cc-tab]").forEach(b => b.onclick = () => { Cloud.ui.tab = b.dataset.ccTab; try { render(); } catch (e) {} });
    on("#ccCopy", (e) => { try { navigator.clipboard?.writeText(Cloud.detail.cls.code); } catch (err) {} toast(t("codeCopied") + Cloud.detail.cls.code); celebrateEvent(e, 8); });
    on("#ccPost", () => {
      if (!ccCan(Cloud.detail.cls, "announce")) { toast(t("onlyOwner")); return; }
      openModal(`<h2>${t("newAnnounce")}</h2><p class="muted">${t("announceSub")}</p>
        <label>${t("messageLbl")}</label><textarea id="ccText"></textarea>
        <div class="btn-row" style="margin-top:14px"><button class="btn primary" id="ccDoPost">${t("postBtn")}</button><button class="btn" id="cancelModal">${t("cancelBtn")}</button></div>`);
      document.getElementById("ccDoPost").onclick = async (e) => {
        const text = document.getElementById("ccText").value.trim();
        if (!text) { toast(t("writeSomething")); return; }
        const mp = memberProfile();
        await doc().collection("posts").add({ authorUid: Cloud.user.uid, authorName: (mp.firstName + " " + mp.lastName).trim() || mp.email, authorEmail: mp.email, authorPfp: mp.pfp || null, text, pinned: false, createdAt: firebase.firestore.FieldValue.serverTimestamp() });
        closeModal(); celebrateEvent(e, 14); toast(t("postedMsg"), true);
      };
    });
    on("#ccAssign", () => {
      if (!ccCan(Cloud.detail.cls, "homework")) { toast(t("onlyOwner")); return; }
      openModal(`<h2>${t("newHw")}</h2><p class="muted">${t("hwSub")}</p>
        <label>${t("titleLbl")}</label><input id="ccTitle" type="text" />
        <label>${t("instrLbl")}</label><textarea id="ccDesc"></textarea>
        <div class="form-row"><div><label>${t("dueLbl")}</label><input id="ccDue" type="datetime-local" /></div>
        <div><label>${t("pointsLbl")}</label><input id="ccPoints" type="text" value="10" /></div></div>
        <label class="checkline"><input type="checkbox" id="ccAnnounce" checked /> ${t("announceHw")}</label>
        <div class="btn-row" style="margin-top:14px"><button class="btn primary" id="ccDoAssign">${t("saveBtn")}</button><button class="btn" id="cancelModal">${t("cancelBtn")}</button></div>`);
      document.getElementById("ccDoAssign").onclick = async (e) => {
        const title = document.getElementById("ccTitle").value.trim();
        if (!title) { toast(t("needTitle")); return; }
        const desc = document.getElementById("ccDesc").value.trim();
        const due = document.getElementById("ccDue").value || "";
        const aref = await doc().collection("assignments").add({
          title, desc, due,
          points: Number(document.getElementById("ccPoints").value) || 0,
          createdBy: Cloud.user.uid, doneBy: [], grades: {}, comments: [],
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        if (document.getElementById("ccAnnounce")?.checked) {
          const mp = memberProfile();
          await doc().collection("posts").add({
            authorUid: Cloud.user.uid, authorName: (mp.firstName + " " + mp.lastName).trim() || mp.email,
            authorEmail: mp.email, authorPfp: mp.pfp || null, text: desc,
            kind: "hw", hwTitle: title, hwDue: due, assignmentId: aref.id,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
          });
        }
        closeModal(); celebrateEvent(e, 14); toast(t("hwSaved"), true);
      };
    });
    $$("[data-cc-toggle]").forEach(b => b.onclick = async (e) => {
      const aref = doc().collection("assignments").doc(b.dataset.ccToggle);
      const s = await aref.get();
      const doneBy = (s.data() && s.data().doneBy) || [];
      const done = !doneBy.includes(Cloud.user.uid);
      await aref.update({ doneBy: done
        ? firebase.firestore.FieldValue.arrayUnion(Cloud.user.uid)
        : firebase.firestore.FieldValue.arrayRemove(Cloud.user.uid) });
      celebrateEvent(e, done ? 12 : 5); toast(done ? t("markedDone") : t("reopenedMsg"), done);
    });
    $$("[data-cc-delassign]").forEach(b => b.onclick = async () => {
      if (!ccCan(Cloud.detail.cls, "homework")) { toast(t("onlyOwner")); return; }
      if (!confirm(t("delConfirm"))) return;
      await doc().collection("assignments").doc(b.dataset.ccDelassign).delete();
    });
    $$("[data-cc-pin]").forEach(b => b.onclick = async (e) => {
      if (!ccCan(Cloud.detail.cls, "announce")) { toast(t("onlyOwner")); return; }
      const pref = doc().collection("posts").doc(b.dataset.ccPin);
      const s = await pref.get();
      const pinned = !(s.data() && s.data().pinned);
      await pref.update({ pinned });
      celebrateEvent(e, 8); toast(pinned ? t("pin") : t("unpin"), pinned);
    });
    $$("[data-cc-grade]").forEach(b => b.onclick = () => {
      if (!ccCan(Cloud.detail.cls, "grades")) { toast(t("onlyOwner")); return; }
      const a = (Cloud.detail.assignments || []).find(x => x.id === b.dataset.ccGrade);
      if (!a) return;
      const members = Cloud.detail.members || [];
      openModal(`<h2>${t("setGrades")}</h2><p class="muted">${esc(a.title)} · ${a.points || 0} ${t("pts")}</p>
        <div class="grade-list">
        ${members.map((m, i) => {
          const g = (a.grades || {})[normE(m.email)];
          return `<div class="grade-row"><div style="flex:1"><strong>${esc((m.firstName || "") + " " + (m.lastName || ""))}</strong><div class="muted" style="font-size:12px">${esc(m.email)}</div></div>
            <input type="number" id="ccgrade-${i}" min="0" max="${a.points || 0}" step="0.5" value="${g === undefined ? "" : esc(g)}" placeholder="–" /></div>`;
        }).join("")}
        </div>
        <div class="btn-row" style="margin-top:14px"><button class="btn primary" id="ccDoGrades">${t("saveBtn")}</button><button class="btn" id="cancelModal">${t("cancelBtn")}</button></div>`);
      document.getElementById("ccDoGrades").onclick = async () => {
        const grades = { ...(a.grades || {}) };
        for (let i = 0; i < members.length; i++) {
          const v = document.getElementById("ccgrade-" + i).value.trim();
          const key = normE(members[i].email);
          if (v === "") delete grades[key];
          else {
            const n = Number(v);
            if (isNaN(n) || n < 0 || n > (a.points || 0)) { toast(t("gradeRange").replace("{m}", a.points || 0)); return; }
            grades[key] = n;
          }
        }
        await doc().collection("assignments").doc(a.id).update({ grades });
        closeModal(); toast(t("gradesSaved"), true);
      };
    });
    $$("[data-cc-comments]").forEach(b => b.onclick = () => {
      const key = b.dataset.ccComments;
      if (Cloud.expanded[key]) { delete Cloud.expanded[key]; try { render(); } catch (e) {} return; }
      Cloud.expanded[key] = true;
      const [kind, id] = key.split(":");
      if (!Cloud.cCache[key]) { Cloud.cCache[key] = null; loadCcComments(kind, id); }
      try { render(); } catch (e) {}
    });
    $$("[data-cc-send]").forEach(b => b.onclick = async () => {
      const key = b.dataset.ccSend;
      const [kind, id] = key.split(":");
      const input = document.querySelector(`[data-ccinput="${key}"]`);
      const text = (input?.value || "").trim();
      if (!text || !Cloud.user) return;
      const mp = memberProfile();
      const coll = kind === "p" ? "posts" : "assignments";
      await doc().collection(coll).doc(id).collection("comments").add({
        authorUid: Cloud.user.uid,
        authorName: (mp.firstName + " " + mp.lastName).trim() || mp.email,
        authorEmail: mp.email, authorPfp: mp.pfp || null, text,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });
      await loadCcComments(kind, id);
      celebrateEvent(b, 6);
    });
    $$("[data-ccinput]").forEach(inp => inp.onkeydown = (e) => {
      if (e.key === "Enter") {
        const btn = document.querySelector(`[data-cc-send="${inp.dataset.ccinput}"]`);
        btn?.click();
      }
    });
    on("#ccLeave", async () => {
      await doc().collection("members").doc(Cloud.user.uid).delete().catch(() => {});
      try { await doc().update({ memberUids: firebase.firestore.FieldValue.arrayRemove(Cloud.user.uid) }); } catch (e) {}
      try { state.route = "home"; state.classId = null; render(); } catch (err) {}
      toast(t("leftMsg"));
    });
    on("#ccArch", async (e) => {
      if (!Cloud.isOwner(Cloud.detail.cls)) { toast(t("onlyOwner")); return; }
      await doc().update({ archived: !(Cloud.detail.cls.archived) });
      celebrateEvent(e, 8); toast(Cloud.detail.cls.archived ? t("restoredToast") : t("archivedToast"));
    });
    on("#ccDel", async () => {
      if (!Cloud.isOwner(Cloud.detail.cls)) { toast(t("onlyOwner")); return; }
      if (!confirm(t("delClassConfirm"))) return;
      const cid = Cloud.detail.cls.id;
      Cloud.closeDetail();
      await Cloud.db.collection("classes").doc(cid).delete().catch(() => {});
      try { state.route = "home"; state.classId = null; render(); } catch (e) {}
      toast(t("classDeleted"));
    });
    on("#ccPerms", () => ccOpenPermsModal(Cloud.detail.cls));
    $$(".ext-link").forEach(a => a.onclick = (e) => { e.preventDefault(); try { openLinkWarning(a.dataset.url || a.textContent); } catch (err) {} });
    $$("[data-ccsubsend]").forEach(b => b.onclick = async () => {
      if (!Cloud.user) return;
      const aid = b.dataset.ccsubsend;
      const input = document.querySelector(`[data-ccsubinput="${aid}"]`);
      const text = (input?.value || "").trim();
      if (!text) return;
      const mp = memberProfile();
      await doc().collection("assignments").doc(aid).collection("submissions").doc(Cloud.user.uid).set({
        email: mp.email, name: ((mp.firstName + " " + mp.lastName).trim() || mp.email),
        text, date: new Date().toISOString()
      }, { merge: true });
      Cloud.subsReady = null;
      await fetchCcSubs(Cloud.detail.cls.id, (Cloud.detail.assignments || []).map(a => a.id));
      celebrateEvent(b, 10); toast(t("submitted"), true);
    });
    $$("[data-ccsubinput]").forEach(inp => inp.onkeydown = (e) => {
      if (e.key === "Enter") {
        const btn = document.querySelector(`[data-ccsubsend="${inp.dataset.ccsubinput}"]`);
        btn?.click();
      }
    });
    $$("[data-ccfbsend]").forEach(b => b.onclick = async () => {
      if (!ccCan(Cloud.detail.cls, "grades")) { toast(t("onlyOwner")); return; }
      const [aid, uid] = b.dataset.ccfbsend.split(":");
      const input = document.querySelector(`[data-ccfbinput="${aid}:${uid}"]`);
      await doc().collection("assignments").doc(aid).collection("submissions").doc(uid).update({
        feedback: (input?.value || "").trim(), fdate: new Date().toISOString()
      });
      Cloud.subsReady = null;
      await fetchCcSubs(Cloud.detail.cls.id, (Cloud.detail.assignments || []).map(a => a.id));
      toast(t("gradesSaved"), true);
    });
  };

  // Sidebar cloud list (under local classes)
  Cloud.sideHTML = function () {
    if (!Cloud.configured || !Cloud.user || !Cloud.cloudClasses.length) return "";
    return Cloud.cloudClasses.filter(c => !c.archived).slice(0, 10).map(c =>
      `<button class="side-class-item" data-cloud-open="${c.id}"><span class="dot" style="${bannerStyle(c.color)}"></span><span>☁ ${esc(c.name)}</span><span class="cbadge" data-cbadge="${c.id}" style="display:none"></span></button>`
    ).join("");
  };

  document.addEventListener("DOMContentLoaded", () => Cloud.init());
  if (document.readyState !== "loading") Cloud.init();
})();
