/* Student's Class — local-only app. Data stored in localStorage. */
const LS_PROFILE = "sc_profile_v1";
const LS_CLASSES = "sc_classes_v1";
const LS_THEME = "sc_theme_v1"; // system | light | dark
const LS_LANG = "sc_lang_v1";

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const uid = () => Math.random().toString(36).slice(2, 9) + Date.now().toString(36).slice(-4);
const esc = (s = "") => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const BANNERS = ["banner-1", "banner-2", "banner-3", "banner-4", "banner-5", "banner-6"];
const bannerStyle = (b) => `background:var(--${BANNERS.includes(b) ? b : "banner-1"})`;

/* ================= Languages ================= */
const LANGS = { en: "English", es: "Español", pt: "Português", fr: "Français", de: "Deutsch" };
const LOCALES = { en: "en-US", es: "es-ES", pt: "pt-PT", fr: "fr-FR", de: "de-DE" };
const I18N = {
en: { home:"Home", todo:"To-do", calendar:"Calendar", archived:"Archived", settings:"Settings", classes:"Classes", createClass:"Create class", joinClass:"Join class", search:"Search", signedInAs:"Signed in as", noClasses:"No classes yet", noClassesSub:"Create a class or join one with a code.", loadDemo:"Load demo classes", todoTitle:"To-do", pendingIn:"{n} pending in {m} classes", nothingTodo:"Nothing to do.", calendarTitle:"Calendar", calendarSub:"Homework due dates. Click an item to open its class.", prev:"Prev", next:"Next", today:"Today", dueIn:"Due in {m}", open:"Open", noDueMonth:"No homework due this month.", archivedTitle:"Archived", archivedSub:"Old classes kept for reference.", noArchived:"No archived classes.", settingsTitle:"Settings", settingsSub:"Theme, language, profile and data.", appearance:"Appearance", appearanceSub:"System follows your device light/dark setting automatically.", sysTheme:"System", lightTheme:"Light", darkTheme:"Dark", followDevice:"Follow device", alwaysLight:"Always light", alwaysDark:"Always dark", language:"Language", languageSub:"Applies to the whole app immediately.", profileSec:"Profile", noProfile:"No profile yet.", createProfile:"Create profile", editProfile:"Edit profile", dataSec:"Data", dataSub:"Stored locally in this browser. Export a backup file or delete everything.", exportBtn:"Export", importBtn:"Import", wipeBtn:"Delete everything", welcome:"Welcome to Student's Class", editProfileTitle:"Edit profile", profileLocal1:"This profile is only saved on this device. It is used as your identity in classes.", profileLocal2:"Everything is saved locally in this browser.", uploadPic:"Upload picture", removeBtn:"Remove", firstName:"First name *", surnames:"Surnames *", roleLbl:"Role", studentRole:"Student", teacherRole:"Teacher", emailLbl:"Email *", bioLbl:"Bio (optional)", saveBtn:"Save", cancelBtn:"Cancel", fillAll:"Fill in name, surnames and email", profileSaved:"Profile saved", imgTooBig:"Image too big, use a file under 5 MB", createClassTitle:"Create class", createClassSub:"Enter the details. A join code is generated automatically.", classNameLbl:"Class name *", subjectLbl:"Subject", sectionLbl:"Section / group", roomLbl:"Room", colourLbl:"Colour", colourOpt:"Colour {n}", descLbl:"Description", createBtn:"Create", needName:"Give the class a name", classCreated:"Class created. Code: ", joinTitle:"Join class", joinSub:"Ask your teacher for the 6-character code.", codeLbl:"Class code", joinBtn:"Join", noCode:"No class found with that code on this device", joinedMsg:"Joined ", newAnnounce:"New announcement", announceSub:"This will appear in the class stream.", messageLbl:"Message", postBtn:"Post", writeSomething:"Write something first", postedMsg:"Announcement posted", newHw:"New homework", hwSub:"It will show in Classwork, To-do and Calendar.", titleLbl:"Title *", instrLbl:"Instructions", dueLbl:"Due date", pointsLbl:"Points", needTitle:"Title is required", hwSaved:"Homework saved", codeTitle:"Class code", shareCode:"Share it so others can join.", copyCode:"Copy code", codeCopied:"Code copied: ", archiveBtn:"Archive", unarchiveBtn:"Unarchive", archivedToast:"Class archived", restoredToast:"Class restored", aboutTitle:"About", noDesc:"No description.", membersWord:"members", newAnnounceBtn:"New announcement", newHwBtn:"New homework", noAnnounce:"No announcements yet.", noHw:"No homework yet.", markDone:"Mark done", reopenBtn:"Reopen", deleteBtn:"Delete", delConfirm:"Delete this homework?", teacherWord:"Teacher", membersTitle:"Members", addMemberBtn:"Add member", onlyOwner:"Only the class owner can post announcements and homework here.", backAll:"All classes", pendingWord:"pending", addMemberTitle:"Add member", addMemberSub:"Add someone manually to this class.", nameLbl:"Name", emailLbl2:"Email", addBtn:"Add", leaveBtn:"Leave class", leftMsg:"You left the class", markedDone:"Marked as done", reopenedMsg:"Reopened", backupImported:"Backup imported", invalidFile:"Invalid file", confirmWipe:"Delete all local data?", noDueDate:"No due date", themeWord:"Theme: ", pts:"pts", allDataLocal:"All data is stored locally in this browser." },
es: { home:"Inicio", todo:"Pendientes", calendar:"Calendario", archived:"Archivadas", settings:"Ajustes", classes:"Clases", createClass:"Crear clase", joinClass:"Unirse", search:"Buscar", signedInAs:"Sesión iniciada como", noClasses:"Aún no hay clases", noClassesSub:"Crea una clase o únete con un código.", loadDemo:"Cargar clases de ejemplo", todoTitle:"Pendientes", pendingIn:"{n} pendientes en {m} clases", nothingTodo:"Nada pendiente.", calendarTitle:"Calendario", calendarSub:"Fechas de entrega. Haz clic para abrir la clase.", prev:"Anterior", next:"Siguiente", today:"Hoy", dueIn:"Entregas en {m}", open:"Abrir", noDueMonth:"Sin tareas este mes.", archivedTitle:"Archivadas", archivedSub:"Clases antiguas guardadas.", noArchived:"No hay clases archivadas.", settingsTitle:"Ajustes", settingsSub:"Tema, idioma, perfil y datos.", appearance:"Apariencia", appearanceSub:"Sistema sigue el modo claro/oscuro de tu dispositivo.", sysTheme:"Sistema", lightTheme:"Claro", darkTheme:"Oscuro", followDevice:"Seguir dispositivo", alwaysLight:"Siempre claro", alwaysDark:"Siempre oscuro", language:"Idioma", languageSub:"Se aplica a toda la app al instante.", profileSec:"Perfil", noProfile:"Aún no hay perfil.", createProfile:"Crear perfil", editProfile:"Editar perfil", dataSec:"Datos", dataSub:"Guardados solo en este navegador. Exporta una copia o bórralo todo.", exportBtn:"Exportar", importBtn:"Importar", wipeBtn:"Borrar todo", welcome:"Bienvenido a Student's Class", editProfileTitle:"Editar perfil", profileLocal1:"Este perfil solo se guarda en este dispositivo. Es tu identidad en las clases.", profileLocal2:"Todo se guarda localmente en este navegador.", uploadPic:"Subir foto", removeBtn:"Quitar", firstName:"Nombre *", surnames:"Apellidos *", roleLbl:"Rol", studentRole:"Estudiante", teacherRole:"Profesor", emailLbl:"Correo *", bioLbl:"Biografía (opcional)", saveBtn:"Guardar", cancelBtn:"Cancelar", fillAll:"Completa nombre, apellidos y correo", profileSaved:"Perfil guardado", imgTooBig:"Imagen muy grande, usa menos de 5 MB", createClassTitle:"Crear clase", createClassSub:"Introduce los datos. Se genera un código automáticamente.", classNameLbl:"Nombre de la clase *", subjectLbl:"Asignatura", sectionLbl:"Grupo", roomLbl:"Aula", colourLbl:"Color", colourOpt:"Color {n}", descLbl:"Descripción", createBtn:"Crear", needName:"Ponle un nombre a la clase", classCreated:"Clase creada. Código: ", joinTitle:"Unirse a clase", joinSub:"Pide a tu profesor el código de 6 caracteres.", codeLbl:"Código de clase", joinBtn:"Unirse", noCode:"No hay ninguna clase con ese código en este dispositivo", joinedMsg:"Te uniste a ", newAnnounce:"Nuevo anuncio", announceSub:"Aparecerá en el tablón de la clase.", messageLbl:"Mensaje", postBtn:"Publicar", writeSomething:"Escribe algo primero", postedMsg:"Anuncio publicado", newHw:"Nueva tarea", hwSub:"Aparecerá en Trabajo, Pendientes y Calendario.", titleLbl:"Título *", instrLbl:"Instrucciones", dueLbl:"Fecha de entrega", pointsLbl:"Puntos", needTitle:"El título es obligatorio", hwSaved:"Tarea guardada", codeTitle:"Código de clase", shareCode:"Compártelo para que otros se unan.", copyCode:"Copiar código", codeCopied:"Código copiado: ", archiveBtn:"Archivar", unarchiveBtn:"Desarchivar", archivedToast:"Clase archivada", restoredToast:"Clase restaurada", aboutTitle:"Información", noDesc:"Sin descripción.", membersWord:"miembros", newAnnounceBtn:"Nuevo anuncio", newHwBtn:"Nueva tarea", noAnnounce:"Aún no hay anuncios.", noHw:"Aún no hay tareas.", markDone:"Marcar hecha", reopenBtn:"Reabrir", deleteBtn:"Eliminar", delConfirm:"¿Eliminar esta tarea?", teacherWord:"Profesor", membersTitle:"Miembros", addMemberBtn:"Añadir miembro", onlyOwner:"Solo el creador de la clase puede publicar anuncios y tareas aquí.", backAll:"Todas las clases", pendingWord:"pendientes", addMemberTitle:"Añadir miembro", addMemberSub:"Añade a alguien manualmente.", nameLbl:"Nombre", emailLbl2:"Correo", addBtn:"Añadir", leaveBtn:"Salir de la clase", leftMsg:"Saliste de la clase", markedDone:"Marcada como hecha", reopenedMsg:"Reabierta", backupImported:"Copia importada", invalidFile:"Archivo no válido", confirmWipe:"¿Borrar todos los datos?", noDueDate:"Sin fecha de entrega", themeWord:"Tema: ", pts:"pts", allDataLocal:"Todos los datos se guardan localmente en este navegador." },
pt: { home:"Início", todo:"Tarefas", calendar:"Calendário", archived:"Arquivadas", settings:"Definições", classes:"Turmas", createClass:"Criar turma", joinClass:"Entrar", search:"Pesquisar", signedInAs:"Sessão iniciada como", noClasses:"Ainda sem turmas", noClassesSub:"Cria uma turma ou entra com um código.", loadDemo:"Carregar turmas de exemplo", todoTitle:"Tarefas", pendingIn:"{n} pendentes em {m} turmas", nothingTodo:"Nada por fazer.", calendarTitle:"Calendário", calendarSub:"Datas de entrega. Clica para abrir a turma.", prev:"Anterior", next:"Seguinte", today:"Hoje", dueIn:"Entregas em {m}", open:"Abrir", noDueMonth:"Sem trabalhos este mês.", archivedTitle:"Arquivadas", archivedSub:"Turmas antigas guardadas.", noArchived:"Sem turmas arquivadas.", settingsTitle:"Definições", settingsSub:"Tema, idioma, perfil e dados.", appearance:"Aparência", appearanceSub:"Sistema segue o modo claro/escuro do dispositivo.", sysTheme:"Sistema", lightTheme:"Claro", darkTheme:"Escuro", followDevice:"Seguir dispositivo", alwaysLight:"Sempre claro", alwaysDark:"Sempre escuro", language:"Idioma", languageSub:"Aplica-se a toda a app de imediato.", profileSec:"Perfil", noProfile:"Ainda sem perfil.", createProfile:"Criar perfil", editProfile:"Editar perfil", dataSec:"Dados", dataSub:"Guardados só neste navegador. Exporta uma cópia ou apaga tudo.", exportBtn:"Exportar", importBtn:"Importar", wipeBtn:"Apagar tudo", welcome:"Bem-vindo ao Student's Class", editProfileTitle:"Editar perfil", profileLocal1:"Este perfil só é guardado neste dispositivo. É a tua identidade nas turmas.", profileLocal2:"Tudo é guardado localmente neste navegador.", uploadPic:"Carregar foto", removeBtn:"Remover", firstName:"Nome *", surnames:"Apelidos *", roleLbl:"Papel", studentRole:"Aluno", teacherRole:"Professor", emailLbl:"Email *", bioLbl:"Bio (opcional)", saveBtn:"Guardar", cancelBtn:"Cancelar", fillAll:"Preenche nome, apelidos e email", profileSaved:"Perfil guardado", imgTooBig:"Imagem muito grande, usa menos de 5 MB", createClassTitle:"Criar turma", createClassSub:"Introduz os dados. Um código é gerado automaticamente.", classNameLbl:"Nome da turma *", subjectLbl:"Disciplina", sectionLbl:"Grupo", roomLbl:"Sala", colourLbl:"Cor", colourOpt:"Cor {n}", descLbl:"Descrição", createBtn:"Criar", needName:"Dá um nome à turma", classCreated:"Turma criada. Código: ", joinTitle:"Entrar na turma", joinSub:"Pede ao professor o código de 6 caracteres.", codeLbl:"Código da turma", joinBtn:"Entrar", noCode:"Nenhuma turma com esse código neste dispositivo", joinedMsg:"Entraste em ", newAnnounce:"Novo anúncio", announceSub:"Vai aparecer no mural da turma.", messageLbl:"Mensagem", postBtn:"Publicar", writeSomething:"Escreve algo primeiro", postedMsg:"Anúncio publicado", newHw:"Novo trabalho", hwSub:"Aparece em Trabalhos, Tarefas e Calendário.", titleLbl:"Título *", instrLbl:"Instruções", dueLbl:"Data de entrega", pointsLbl:"Pontos", needTitle:"O título é obrigatório", hwSaved:"Trabalho guardado", codeTitle:"Código da turma", shareCode:"Partilha para outros entrarem.", copyCode:"Copiar código", codeCopied:"Código copiado: ", archiveBtn:"Arquivar", unarchiveBtn:"Desarquivar", archivedToast:"Turma arquivada", restoredToast:"Turma restaurada", aboutTitle:"Sobre", noDesc:"Sem descrição.", membersWord:"membros", newAnnounceBtn:"Novo anúncio", newHwBtn:"Novo trabalho", noAnnounce:"Ainda sem anúncios.", noHw:"Ainda sem trabalhos.", markDone:"Marcar feita", reopenBtn:"Reabrir", deleteBtn:"Eliminar", delConfirm:"Eliminar este trabalho?", teacherWord:"Professor", membersTitle:"Membros", addMemberBtn:"Adicionar membro", onlyOwner:"Só o criador da turma pode publicar aqui.", backAll:"Todas as turmas", pendingWord:"pendentes", addMemberTitle:"Adicionar membro", addMemberSub:"Adiciona alguém manualmente.", nameLbl:"Nome", emailLbl2:"Email", addBtn:"Adicionar", leaveBtn:"Sair da turma", leftMsg:"Saíste da turma", markedDone:"Marcada como feita", reopenedMsg:"Reaberta", backupImported:"Cópia importada", invalidFile:"Ficheiro inválido", confirmWipe:"Apagar todos os dados?", noDueDate:"Sem data de entrega", themeWord:"Tema: ", pts:"pts", allDataLocal:"Todos os dados ficam guardados localmente neste navegador." },
fr: { home:"Accueil", todo:"À faire", calendar:"Calendrier", archived:"Archivées", settings:"Paramètres", classes:"Classes", createClass:"Créer un cours", joinClass:"Rejoindre", search:"Rechercher", signedInAs:"Connecté en tant que", noClasses:"Aucun cours pour l'instant", noClassesSub:"Créez un cours ou rejoignez-en un avec un code.", loadDemo:"Charger des cours démo", todoTitle:"À faire", pendingIn:"{n} en attente dans {m} cours", nothingTodo:"Rien à faire.", calendarTitle:"Calendrier", calendarSub:"Dates limites des devoirs. Cliquez pour ouvrir.", prev:"Préc.", next:"Suiv.", today:"Aujourd'hui", dueIn:"Échéances en {m}", open:"Ouvrir", noDueMonth:"Aucun devoir ce mois-ci.", archivedTitle:"Archivées", archivedSub:"Anciens cours conservés.", noArchived:"Aucun cours archivé.", settingsTitle:"Paramètres", settingsSub:"Thème, langue, profil et données.", appearance:"Apparence", appearanceSub:"Système suit le mode clair/sombre de l'appareil.", sysTheme:"Système", lightTheme:"Clair", darkTheme:"Sombre", followDevice:"Suivre l'appareil", alwaysLight:"Toujours clair", alwaysDark:"Toujours sombre", language:"Langue", languageSub:"S'applique à toute l'app immédiatement.", profileSec:"Profil", noProfile:"Pas encore de profil.", createProfile:"Créer un profil", editProfile:"Modifier le profil", dataSec:"Données", dataSub:"Stockées localement. Exportez ou supprimez tout.", exportBtn:"Exporter", importBtn:"Importer", wipeBtn:"Tout supprimer", welcome:"Bienvenue sur Student's Class", editProfileTitle:"Modifier le profil", profileLocal1:"Ce profil est enregistré uniquement sur cet appareil.", profileLocal2:"Tout est enregistré localement.", uploadPic:"Ajouter une photo", removeBtn:"Retirer", firstName:"Prénom *", surnames:"Nom *", roleLbl:"Rôle", studentRole:"Élève", teacherRole:"Professeur", emailLbl:"Email *", bioLbl:"Bio (optionnel)", saveBtn:"Enregistrer", cancelBtn:"Annuler", fillAll:"Remplissez prénom, nom et email", profileSaved:"Profil enregistré", imgTooBig:"Image trop grande, max 5 Mo", createClassTitle:"Créer un cours", createClassSub:"Entrez les infos. Un code est généré.", classNameLbl:"Nom du cours *", subjectLbl:"Matière", sectionLbl:"Groupe", roomLbl:"Salle", colourLbl:"Couleur", colourOpt:"Couleur {n}", descLbl:"Description", createBtn:"Créer", needName:"Donnez un nom au cours", classCreated:"Cours créé. Code : ", joinTitle:"Rejoindre un cours", joinSub:"Demandez le code à 6 caractères.", codeLbl:"Code du cours", joinBtn:"Rejoindre", noCode:"Aucun cours avec ce code sur cet appareil", joinedMsg:"Cours rejoint : ", newAnnounce:"Nouvelle annonce", announceSub:"Elle apparaîtra dans le flux.", messageLbl:"Message", postBtn:"Publier", writeSomething:"Écrivez d'abord quelque chose", postedMsg:"Annonce publiée", newHw:"Nouveau devoir", hwSub:"Visible dans Devoirs, À faire et Calendrier.", titleLbl:"Titre *", instrLbl:"Consignes", dueLbl:"Date limite", pointsLbl:"Points", needTitle:"Titre requis", hwSaved:"Devoir enregistré", codeTitle:"Code du cours", shareCode:"Partagez-le pour inviter.", copyCode:"Copier le code", codeCopied:"Code copié : ", archiveBtn:"Archiver", unarchiveBtn:"Désarchiver", archivedToast:"Cours archivé", restoredToast:"Cours restauré", aboutTitle:"Infos", noDesc:"Pas de description.", membersWord:"membres", newAnnounceBtn:"Nouvelle annonce", newHwBtn:"Nouveau devoir", noAnnounce:"Aucune annonce.", noHw:"Aucun devoir.", markDone:"Marquer fait", reopenBtn:"Rouvrir", deleteBtn:"Supprimer", delConfirm:"Supprimer ce devoir ?", teacherWord:"Professeur", membersTitle:"Membres", addMemberBtn:"Ajouter un membre", onlyOwner:"Seul le créateur du cours peut publier ici.", backAll:"Tous les cours", pendingWord:"en attente", addMemberTitle:"Ajouter un membre", addMemberSub:"Ajoutez quelqu'un manuellement.", nameLbl:"Nom", emailLbl2:"Email", addBtn:"Ajouter", leaveBtn:"Quitter le cours", leftMsg:"Vous avez quitté le cours", markedDone:"Marqué comme fait", reopenedMsg:"Rouvert", backupImported:"Sauvegarde importée", invalidFile:"Fichier invalide", confirmWipe:"Supprimer toutes les données ?", noDueDate:"Pas de date limite", themeWord:"Thème : ", pts:"pts", allDataLocal:"Toutes les données sont stockées localement." },
de: { home:"Start", todo:"Aufgaben", calendar:"Kalender", archived:"Archiviert", settings:"Einstellungen", classes:"Klassen", createClass:"Klasse erstellen", joinClass:"Beitreten", search:"Suchen", signedInAs:"Angemeldet als", noClasses:"Noch keine Klassen", noClassesSub:"Erstelle eine Klasse oder tritt mit einem Code bei.", loadDemo:"Demo-Klassen laden", todoTitle:"Aufgaben", pendingIn:"{n} offen in {m} Klassen", nothingTodo:"Nichts zu tun.", calendarTitle:"Kalender", calendarSub:"Abgabetermine. Klicke zum Öffnen.", prev:"Zurück", next:"Weiter", today:"Heute", dueIn:"Fällig in {m}", open:"Öffnen", noDueMonth:"Keine Aufgaben in diesem Monat.", archivedTitle:"Archiviert", archivedSub:"Alte Klassen als Referenz.", noArchived:"Keine archivierten Klassen.", settingsTitle:"Einstellungen", settingsSub:"Design, Sprache, Profil und Daten.", appearance:"Darstellung", appearanceSub:"System folgt dem Hell/Dunkel-Modus des Geräts.", sysTheme:"System", lightTheme:"Hell", darkTheme:"Dunkel", followDevice:"Gerät folgen", alwaysLight:"Immer hell", alwaysDark:"Immer dunkel", language:"Sprache", languageSub:"Gilt sofort für die ganze App.", profileSec:"Profil", noProfile:"Noch kein Profil.", createProfile:"Profil erstellen", editProfile:"Profil bearbeiten", dataSec:"Daten", dataSub:"Nur lokal gespeichert. Exportieren oder alles löschen.", exportBtn:"Exportieren", importBtn:"Importieren", wipeBtn:"Alles löschen", welcome:"Willkommen bei Student's Class", editProfileTitle:"Profil bearbeiten", profileLocal1:"Dieses Profil wird nur auf diesem Gerät gespeichert.", profileLocal2:"Alles wird lokal gespeichert.", uploadPic:"Bild hochladen", removeBtn:"Entfernen", firstName:"Vorname *", surnames:"Nachname *", roleLbl:"Rolle", studentRole:"Schüler", teacherRole:"Lehrer", emailLbl:"E-Mail *", bioLbl:"Bio (optional)", saveBtn:"Speichern", cancelBtn:"Abbrechen", fillAll:"Bitte Name, Nachname und E-Mail ausfüllen", profileSaved:"Profil gespeichert", imgTooBig:"Bild zu groß, max 5 MB", createClassTitle:"Klasse erstellen", createClassSub:"Daten eingeben. Ein Code wird erzeugt.", classNameLbl:"Klassenname *", subjectLbl:"Fach", sectionLbl:"Gruppe", roomLbl:"Raum", colourLbl:"Farbe", colourOpt:"Farbe {n}", descLbl:"Beschreibung", createBtn:"Erstellen", needName:"Gib der Klasse einen Namen", classCreated:"Klasse erstellt. Code: ", joinTitle:"Klasse beitreten", joinSub:"Frag deine Lehrkraft nach dem 6-stelligen Code.", codeLbl:"Klassencode", joinBtn:"Beitreten", noCode:"Keine Klasse mit diesem Code auf diesem Gerät", joinedMsg:"Beigetreten: ", newAnnounce:"Neue Mitteilung", announceSub:"Erscheint im Klassen-Stream.", messageLbl:"Nachricht", postBtn:"Posten", writeSomething:"Schreibe zuerst etwas", postedMsg:"Mitteilung gepostet", newHw:"Neue Hausaufgabe", hwSub:"Erscheint unter Aufgaben, To-do und Kalender.", titleLbl:"Titel *", instrLbl:"Anweisungen", dueLbl:"Fällig am", pointsLbl:"Punkte", needTitle:"Titel erforderlich", hwSaved:"Hausaufgabe gespeichert", codeTitle:"Klassencode", shareCode:"Teile ihn, damit andere beitreten.", copyCode:"Code kopieren", codeCopied:"Code kopiert: ", archiveBtn:"Archivieren", unarchiveBtn:"Wiederherstellen", archivedToast:"Klasse archiviert", restoredToast:"Klasse wiederhergestellt", aboutTitle:"Info", noDesc:"Keine Beschreibung.", membersWord:"Mitglieder", newAnnounceBtn:"Neue Mitteilung", newHwBtn:"Neue Hausaufgabe", noAnnounce:"Noch keine Mitteilungen.", noHw:"Noch keine Aufgaben.", markDone:"Erledigt", reopenBtn:"Erneut öffnen", deleteBtn:"Löschen", delConfirm:"Diese Aufgabe löschen?", teacherWord:"Lehrkraft", membersTitle:"Mitglieder", addMemberBtn:"Mitglied hinzufügen", onlyOwner:"Nur der Ersteller kann hier posten.", backAll:"Alle Klassen", pendingWord:"offen", addMemberTitle:"Mitglied hinzufügen", addMemberSub:"Jemanden manuell hinzufügen.", nameLbl:"Name", emailLbl2:"E-Mail", addBtn:"Hinzufügen", leaveBtn:"Klasse verlassen", leftMsg:"Klasse verlassen", markedDone:"Als erledigt markiert", reopenedMsg:"Wieder geöffnet", backupImported:"Backup importiert", invalidFile:"Ungültige Datei", confirmWipe:"Alle Daten löschen?", noDueDate:"Kein Fälligkeitsdatum", themeWord:"Design: ", pts:"Pkte", allDataLocal:"Alle Daten bleiben lokal in diesem Browser." }
};

function t(k) { return (I18N[lang] && I18N[lang][k]) || I18N.en[k] || k; }
function tf(k, vars) { let s = t(k); Object.keys(vars || {}).forEach(key => { s = s.replace("{" + key + "}", vars[key]); }); return s; }
function locale() { return LOCALES[lang] || "en-US"; }
function setLang(l) {
  if (!LANGS[l]) return;
  lang = l; save(LS_LANG, lang);
  document.documentElement.lang = lang;
  applyStaticI18n(); render();
}
function applyStaticI18n() {
  $$("[data-i18n]").forEach(el => { el.textContent = t(el.dataset.i18n); });
  $$("[data-i18n-ph]").forEach(el => { el.placeholder = t(el.dataset.i18nPh); });
  document.title = "Student's Class";
}

/* ================= State ================= */
const now = new Date();
let state = { route: "home", classId: null, tab: "stream", search: "", calYear: now.getFullYear(), calMonth: now.getMonth() };
function load(k, fb) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : fb; } catch { return fb; } }
function save(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { } }
function saveAll() { save(LS_PROFILE, profile); save(LS_CLASSES, classes); save(LS_THEME, theme); save(LS_LANG, lang); }

let profile = load(LS_PROFILE, null);
let classes = load(LS_CLASSES, []);
let theme = load(LS_THEME, "system");
let lang = load(LS_LANG, null);
if (!lang || !LANGS[lang]) {
  const nav = (navigator.language || "en").slice(0, 2).toLowerCase();
  lang = LANGS[nav] ? nav : "en";
}

/* Migrate old classes: ensure ownerEmail */
classes.forEach(c => { if (!c.ownerEmail) c.ownerEmail = (c.teacher && c.teacher.email) || ""; });

/* One-time cleanup: remove the old auto-created "Testing" demo class (if any).
   Only touches the seeded demo (teacher testing@students.class) — never user classes. */
(function removeSeededTestingClass() {
  const before = classes.length;
  classes = classes.filter(c => !(
    c.code === "TEST01" &&
    ((c.teacher && c.teacher.email) === "testing@students.class" || c.ownerEmail === "testing@students.class")
  ));
  if (classes.length !== before) save(LS_CLASSES, classes);
})();

/* Permissions: only the class owner (creator) can post/manage. Everyone else is a student there. */
function isOwner(c) {
  if (!profile || !c) return false;
  const mine = (profile.email || "").trim().toLowerCase();
  const owner = ((c.ownerEmail || (c.teacher && c.teacher.email)) || "").trim().toLowerCase();
  return !!mine && !!owner && mine === owner;
}

/* ================= Fun feedback: toasts + burst particles ================= */
const FX_COLORS = ["#FF5A70", "#FFC857", "#21C4B5", "#6C63FF", "#1a73e8"];
function burst(x, y, n = 16) {
  const root = $("#fxRoot"); if (!root) return;
  if (x == null || y == null) { x = window.innerWidth / 2; y = window.innerHeight - 120; }
  for (let i = 0; i < n; i++) {
    const p = document.createElement("span");
    p.className = "particle";
    const ang = Math.random() * Math.PI * 2, dist = 50 + Math.random() * 90;
    p.style.left = x + "px"; p.style.top = y + "px";
    p.style.background = FX_COLORS[i % FX_COLORS.length];
    p.style.setProperty("--dx", Math.cos(ang) * dist + "px");
    p.style.setProperty("--dy", (Math.sin(ang) * dist - 40) + "px");
    root.appendChild(p);
    setTimeout(() => p.remove(), 700);
  }
}
function celebrateEvent(e, n) {
  if (e && e.clientX != null) burst(e.clientX, e.clientY, n || 16);
  else burst(undefined, undefined, n || 12);
}
function toast(msg, celebrate) {
  const tEl = document.createElement("div");
  tEl.className = "toast";
  tEl.textContent = (celebrate ? "✓ " : "") + msg;
  $("#toastRoot").appendChild(tEl);
  if (celebrate) { tEl.classList.add("pulse-ok"); burst(undefined, undefined, 10); }
  setTimeout(() => { tEl.style.opacity = "0"; setTimeout(() => tEl.remove(), 300); }, 2400);
}

/* ---------- Theme ---------- */
function applyTheme() { document.documentElement.setAttribute("data-theme", theme); save(LS_THEME, theme); }
function cycleTheme() { theme = theme === "system" ? "light" : theme === "light" ? "dark" : "system"; applyTheme(); render(); toast(t("themeWord") + theme); }
if (window.matchMedia) {
  const mq = matchMedia("(prefers-color-scheme: dark)");
  mq.addEventListener?.("change", () => { if (theme === "system") render(); });
}

/* ---------- Dates ---------- */
function parseDue(a) {
  if (!a || !a.due) return null;
  const d = new Date(a.due);
  return isNaN(d.getTime()) ? null : d;
}
function fmtDue(a) {
  const d = parseDue(a);
  if (!d) return t("noDueDate");
  return d.toLocaleString(locale(), { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
}

/* ---------- Profile ---------- */
function initials() {
  if (!profile) return "?";
  return ((profile.firstName?.[0] || "") + (profile.lastName?.[0] || "")).toUpperCase() || "?";
}
function updateTopAvatar() {
  const img = $("#topAvatar"), fb = $("#topAvatarFallback");
  if (profile?.pfp) { img.src = profile.pfp; img.hidden = false; fb.style.display = "none"; }
  else { img.hidden = true; fb.style.display = "grid"; fb.textContent = initials(); }
}
function avatarHTML(p, cls = "mini-avatar") {
  const pic = (p || profile)?.pfp;
  const init = p ? ((p.firstName?.[0] || "") + (p.lastName?.[0] || "")).toUpperCase() : initials();
  return `<div class="${cls}">${pic ? `<img src="${pic}" alt="avatar"/>` : esc(init || "?")}</div>`;
}
/* Find a class member by email (case-insensitive) so we can show their photo */
function memberByEmail(c, email) {
  if (!c || !email) return null;
  const want = normEmail(email);
  return (c.members || []).find(m => normEmail(m.email) === want) || null;
}
function normEmail(e) { return String(e || "").trim().toLowerCase(); }
/* Grade of the current user on an assignment (null = not graded) */
function myGrade(a) {
  if (!profile) return null;
  const g = (a.grades || {})[normEmail(profile.email)];
  return (g === undefined || g === null || g === "") ? null : Number(g);
}
/* Average of the current user across graded assignments of a class */
function myAverage(c) {
  let sum = 0, n = 0;
  (c.assignments || []).forEach(a => {
    if (!(a.points > 0)) return;
    const g = myGrade(a);
    if (g === null || isNaN(g)) return;
    sum += (g / a.points) * 10; n++;
  });
  return n ? { avg: sum / n, n } : null;
}
/* Pinned announcements first, then newest */
function sortedPosts(c) {
  return [...(c.posts || [])].sort((x, y) => {
    const px = x.pinned ? 1 : 0, py = y.pinned ? 1 : 0;
    if (px !== py) return py - px;
    return new Date(y.date) - new Date(x.date);
  });
}
/* Comments thread HTML shared by posts (kind "p") and homework (kind "a") */
function commentsHTML(items, kind, id) {
  const list = items || [];
  return `<div class="comments" id="comments-${kind}-${id}">`
    + (list.length
      ? list.map(cm => `<div class="comment">${avatarHTML({ firstName: cm.authorName?.[0] || "?", lastName: "", pfp: cm.authorPfp || null }, "mini-avatar sm")}<div class="comment-body"><strong>${esc(cm.authorName || "?")}</strong><span class="muted"> · ${esc(new Date(cm.date).toLocaleString(locale()))}</span><p>${esc(cm.text)}</p></div></div>`).join("")
      : `<p class="muted" style="font-size:12.5px;margin:6px 0">${t("noComments")}</p>`)
    + `<div class="cinput-row"><input type="text" data-cinput="${kind}:${id}" placeholder="${esc(t("commentPh"))}" maxlength="500" /><button class="btn small" data-sendcomment="${kind}:${id}">${t("commentBtn")}</button></div></div>`;
}
/* Push current profile (name + photo) into every local class where you appear */
function propagateProfileToClasses() {
  if (!profile || !profile.email) return;
  const want = profile.email.trim().toLowerCase();
  let changed = false;
  classes.forEach(c => {
    const touch = (m) => {
      if (m && String(m.email || "").trim().toLowerCase() === want) {
        m.firstName = profile.firstName; m.lastName = profile.lastName;
        m.role = profile.role; m.pfp = profile.pfp || null; changed = true;
      }
    };
    touch(c.teacher);
    (c.members || []).forEach(touch);
  });
  if (changed) save(LS_CLASSES, classes);
}

function openProfileModal(force = false) {
  const p = profile || { firstName: "", lastName: "", email: "", role: "student", bio: "", pfp: null };
  openModal(`
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:6px">
      <img src="logo.svg" alt="logo" style="width:36px;height:36px" />
      <h2 style="margin:0">${force ? t("welcome") : t("editProfileTitle")}</h2>
    </div>
    <p class="muted">${force ? t("profileLocal1") : t("profileLocal2")}</p>
    <div class="pfp-row">
      <div class="pfp-preview" id="pfpPreview">${p.pfp ? `<img src="${p.pfp}"/>` : esc((((p.firstName?.[0] || "") + (p.lastName?.[0] || "")).toUpperCase()) || "S")}</div>
      <div class="btn-row">
        <label class="btn small" for="pfpInput" style="cursor:pointer;margin:0">${t("uploadPic")}</label>
        <button class="btn small" id="pfpRemove">${t("removeBtn")}</button>
        <input type="file" id="pfpInput" accept="image/*" hidden />
      </div>
    </div>
    <label>${t("firstName")}</label><input id="fFirst" type="text" value="${esc(p.firstName)}" placeholder="Alex" />
    <div class="form-row">
      <div><label>${t("surnames")}</label><input id="fLast" type="text" value="${esc(p.lastName)}" placeholder="Garcia Perez" /></div>
      <div><label>${t("roleLbl")}</label><select id="fRole"><option value="student" ${p.role === "student" ? "selected" : ""}>${t("studentRole")}</option><option value="teacher" ${p.role === "teacher" ? "selected" : ""}>${t("teacherRole")}</option></select></div>
    </div>
    <label>${t("emailLbl")}</label><input id="fEmail" type="email" value="${esc(p.email)}" placeholder="you@gmail.com" />
    <label>${t("bioLbl")}</label><textarea id="fBio">${esc(p.bio || "")}</textarea>
    <div class="btn-row" style="margin-top:16px">
      <button class="btn primary" id="saveProfile">${t("saveBtn")}</button>
      ${force ? "" : `<button class="btn" id="cancelModal">${t("cancelBtn")}</button>`}
    </div>
  `);
  let newPfp = p.pfp || null;
  $("#pfpInput").addEventListener("change", e => {
    const f = e.target.files[0]; if (!f) return;
    if (f.size > 5 * 1024 * 1024) { toast(t("imgTooBig")); return; }
    const rd = new FileReader();
    rd.onload = () => {
      const img = new Image();
      img.onload = () => {
        const c = document.createElement("canvas"); const s = 256;
        const m = Math.min(img.width, img.height);
        c.width = s; c.height = s;
        c.getContext("2d").drawImage(img, (img.width - m) / 2, (img.height - m) / 2, m, m, 0, 0, s, s);
        newPfp = c.toDataURL("image/jpeg", .82);
        $("#pfpPreview").innerHTML = `<img src="${newPfp}"/>`;
      };
      img.src = rd.result;
    };
    rd.readAsDataURL(f);
  });
  $("#pfpRemove").onclick = () => { newPfp = null; $("#pfpPreview").textContent = "S"; };
  $("#saveProfile").onclick = (e) => {
    const firstName = $("#fFirst").value.trim(), lastName = $("#fLast").value.trim(), email = $("#fEmail").value.trim();
    if (!firstName || !lastName || !email) { $("#saveProfile").classList.add("shake"); setTimeout(() => $("#saveProfile")?.classList.remove("shake"), 300); toast(t("fillAll")); return; }
    profile = { firstName, lastName, email, role: $("#fRole").value, bio: $("#fBio").value.trim(), pfp: newPfp, createdAt: profile?.createdAt || new Date().toISOString() };
    save(LS_PROFILE, profile); propagateProfileToClasses();
    if (window.Cloud && Cloud.syncProfile) Cloud.syncProfile();
    updateTopAvatar(); closeModal(); render(); celebrateEvent(e, 18); toast(t("profileSaved"), true);
  };
}

/* ---------- Modal helpers ---------- */
function openModal(html) {
  $("#modalRoot").innerHTML = `<div class="modal-back" id="mback"><div class="modal">${html}</div></div>`;
  $("#mback").addEventListener("mousedown", e => { if (e.target.id === "mback" && profile) closeModal(); });
  $("#cancelModal")?.addEventListener("click", closeModal);
  document.addEventListener("keydown", escClose);
}
function escClose(e) { if (e.key === "Escape" && profile) closeModal(); }
function closeModal() { $("#modalRoot").innerHTML = ""; document.removeEventListener("keydown", escClose); }

/* ---------- Classes ---------- */
function makeCode() { const c = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; let s = ""; for (let i = 0; i < 6; i++) s += c[Math.floor(Math.random() * c.length)]; return s; }
function myClasses() { return classes.filter(c => !c.archived); }
function getClass(id) { return classes.find(c => c.id === id); }

function openCreateClass() {
  if (!profile) return openProfileModal(true);
  openModal(`
    <h2>${t("createClassTitle")}</h2><p class="muted">${t("createClassSub")}</p>
    <label>${t("classNameLbl")}</label><input id="cName" type="text" placeholder="4th ESO Maths" />
    <div class="form-row">
      <div><label>${t("subjectLbl")}</label><input id="cSubject" type="text" placeholder="Maths" /></div>
      <div><label>${t("sectionLbl")}</label><input id="cSection" type="text" placeholder="Group B" /></div>
    </div>
    <div class="form-row">
      <div><label>${t("roomLbl")}</label><input id="cRoom" type="text" placeholder="Room 12" /></div>
      <div><label>${t("colourLbl")}</label><select id="cColor">${BANNERS.map((b, i) => `<option value="${b}">${tf("colourOpt", { n: i + 1 })}</option>`).join("")}</select></div>
    </div>
    <label>${t("descLbl")}</label><textarea id="cDesc"></textarea>
    ${window.Cloud && Cloud.configured && Cloud.user ? `<label style="display:flex;align-items:center;gap:8px;margin-top:12px;cursor:pointer"><input type="checkbox" id="cOnline" style="width:auto" /> ${t("onlineLabel")}</label>` : ""}
    <div class="btn-row" style="margin-top:16px"><button class="btn primary" id="doCreate">${t("createBtn")}</button><button class="btn" id="cancelModal">${t("cancelBtn")}</button></div>
  `);
  $("#doCreate").onclick = async (e) => {
    const name = $("#cName").value.trim();
    if (!name) { $("#doCreate").classList.add("shake"); setTimeout(() => $("#doCreate")?.classList.remove("shake"), 300); toast(t("needName")); return; }
    if (window.Cloud && Cloud.ready && $("#cOnline")?.checked) {
      try {
        const r = await Cloud.createCloudClass({
          name, subject: $("#cSubject").value.trim(), section: $("#cSection").value.trim(),
          room: $("#cRoom").value.trim(), description: $("#cDesc").value.trim(), color: $("#cColor").value
        });
        closeModal(); celebrateEvent(e, 22); toast(t("cloudCreated") + r.code, true);
        Cloud.openClass(r.id);
      } catch (err) { toast(err.message); }
      return;
    }
    const c = {
      id: uid(), name, subject: $("#cSubject").value.trim(), section: $("#cSection").value.trim(),
      room: $("#cRoom").value.trim(), description: $("#cDesc").value.trim(), color: $("#cColor").value,
      code: makeCode(), teacher: { ...profile }, ownerEmail: profile.email,
      members: [{ ...profile, joinedAt: new Date().toISOString() }],
      posts: [], assignments: [], archived: false, createdAt: new Date().toISOString()
    };
    if (classes.some(x => x.code === c.code)) c.code = makeCode();
    classes.unshift(c); save(LS_CLASSES, classes); closeModal();
    state = { ...state, route: "class", classId: c.id, tab: "stream" };
    render(); celebrateEvent(e, 22); toast(t("classCreated") + c.code, true);
  };
}

function openJoinClass() {
  if (!profile) return openProfileModal(true);
  openModal(`<h2>${t("joinTitle")}</h2><p class="muted">${t("joinSub")}</p>
    <label>${t("codeLbl")}</label><input id="jCode" type="text" placeholder="X7K2PQ" style="text-transform:uppercase" />
    <div class="btn-row" style="margin-top:16px"><button class="btn primary" id="doJoin">${t("joinBtn")}</button><button class="btn" id="cancelModal">${t("cancelBtn")}</button></div>`);
  $("#doJoin").onclick = async (e) => {
    const code = $("#jCode").value.trim().toUpperCase();
    const c = classes.find(x => x.code === code && !x.archived);
    if (!c) {
      if (window.Cloud && Cloud.ready) {
        try {
          const r = await Cloud.joinCloudClass(code);
          if (r) { closeModal(); celebrateEvent(e, 22); toast(t("cloudJoined") + r.name, true); Cloud.openClass(r.id); return; }
        } catch (err) { toast(err.message); return; }
      }
      $("#doJoin").classList.add("shake"); setTimeout(() => $("#doJoin")?.classList.remove("shake"), 300); toast(t("noCode")); return;
    }
    if (!c.members.some(m => (m.email || "").toLowerCase() === (profile.email || "").toLowerCase())) c.members.push({ ...profile, joinedAt: new Date().toISOString() });
    save(LS_CLASSES, classes); closeModal();
    state = { ...state, route: "class", classId: c.id, tab: "stream" };
    render(); celebrateEvent(e, 22); toast(t("joinedMsg") + c.name, true);
  };
}

function seedDemo() {
  const t = new Date().toISOString();
  const mk = (o) => ({ ...o, ownerEmail: o.teacher.email });
  classes = [
    mk({ id: uid(), name: "4th ESO Mathematics", subject: "Maths", section: "Group B", room: "Room 12", description: "Algebra, geometry and problem solving.", color: "banner-1", code: makeCode(), teacher: { firstName: "Maria", lastName: "Lopez", email: "maria.lopez@school.es", role: "teacher" }, members: [{ ...profile }], posts: [{ id: uid(), authorName: "Maria Lopez", text: "Welcome. Homework is posted under Classwork every Monday.", date: t, comments: [] }], assignments: [{ id: uid(), title: "Worksheet 1 - Equations", desc: "Solve exercises 1-10, page 42.", due: new Date(Date.now() + 3 * 864e5).toISOString().slice(0, 16), points: 10, done: false, createdAt: t }], archived: false, createdAt: t }),
    mk({ id: uid(), name: "English B1", subject: "English", section: "", room: "Language lab", description: "Reading and speaking practice.", color: "banner-2", code: makeCode(), teacher: { firstName: "John", lastName: "Smith", email: "john@school.es", role: "teacher" }, members: [{ ...profile }], posts: [], assignments: [{ id: uid(), title: "Read chapter 3", desc: "Write down 5 new words and one summary sentence.", due: new Date(Date.now() + 5 * 864e5).toISOString().slice(0, 16), points: 5, done: false, createdAt: t }], archived: false, createdAt: t })
  ];
  save(LS_CLASSES, classes); render();
}

/* ---------- Posts & homework (owner only) ---------- */
function openPostModal(classId) {
  const c = getClass(classId);
  if (!isOwner(c)) { toast(t("onlyOwner")); return; }
  openModal(`<h2>${t("newAnnounce")}</h2><p class="muted">${t("announceSub")}</p>
    <label>${t("messageLbl")}</label><textarea id="pText"></textarea>
    <div class="btn-row" style="margin-top:14px"><button class="btn primary" id="doPost">${t("postBtn")}</button><button class="btn" id="cancelModal">${t("cancelBtn")}</button></div>`);
  $("#doPost").onclick = (e) => {
    const text = $("#pText").value.trim(); if (!text) { toast(t("writeSomething")); return; }
    c.posts.unshift({ id: uid(), authorName: profile.firstName + " " + profile.lastName, authorEmail: profile.email, authorPfp: profile.pfp || null, text, date: new Date().toISOString(), comments: [] });
    save(LS_CLASSES, classes); closeModal(); render(); celebrateEvent(e, 16); toast(t("postedMsg"), true);
  };
}

function openAssignModal(classId, presetDue = "") {
  const c = getClass(classId);
  if (!isOwner(c)) { toast(t("onlyOwner")); return; }
  openModal(`<h2>${t("newHw")}</h2><p class="muted">${t("hwSub")}</p>
    <label>${t("titleLbl")}</label><input id="aTitle" type="text" />
    <label>${t("instrLbl")}</label><textarea id="aDesc"></textarea>
    <div class="form-row"><div><label>${t("dueLbl")}</label><input id="aDue" type="datetime-local" value="${esc(presetDue)}" /></div>
    <div><label>${t("pointsLbl")}</label><input id="aPoints" type="text" value="10" /></div></div>
    <label class="checkline"><input type="checkbox" id="aAnnounce" checked /> ${t("announceHw")}</label>
    <div class="btn-row" style="margin-top:14px"><button class="btn primary" id="doAssign">${t("saveBtn")}</button><button class="btn" id="cancelModal">${t("cancelBtn")}</button></div>`);
  $("#doAssign").onclick = (e) => {
    const title = $("#aTitle").value.trim(); if (!title) { toast(t("needTitle")); return; }
    const desc = $("#aDesc").value.trim(), due = $("#aDue").value || "";
    const aid = uid();
    c.assignments.unshift({ id: aid, title, desc, due, points: Number($("#aPoints").value) || 0, done: false, grades: {}, comments: [], createdAt: new Date().toISOString() });
    if ($("#aAnnounce")?.checked) {
      c.posts.unshift({ id: uid(), authorName: profile.firstName + " " + profile.lastName, authorEmail: profile.email, authorPfp: profile.pfp || null, text: desc, date: new Date().toISOString(), comments: [], kind: "hw", hwTitle: title, hwDue: due, assignmentId: aid });
    }
    save(LS_CLASSES, classes); closeModal(); render(); celebrateEvent(e, 16); toast(t("hwSaved"), true);
  };
}

/* ---------- Grades (owner only) ---------- */
function openGradeModal(classId, assignId) {
  const c = getClass(classId);
  if (!isOwner(c)) { toast(t("onlyOwner")); return; }
  const a = c.assignments.find(x => x.id === assignId);
  if (!a) return;
  if (!a.grades) a.grades = {};
  openModal(`<h2>${t("setGrades")}</h2><p class="muted">${esc(a.title)} · ${a.points} ${t("pts")}</p>
    <div class="grade-list">
    ${(c.members || []).map((m, i) => {
      const g = a.grades[normEmail(m.email)];
      return `<div class="grade-row"><div style="flex:1"><strong>${esc(m.firstName)} ${esc(m.lastName)}</strong><div class="muted" style="font-size:12px">${esc(m.email)}</div></div>
        <input type="number" id="grade-${i}" min="0" max="${a.points}" step="0.5" value="${g === undefined ? "" : esc(g)}" placeholder="–" /></div>`;
    }).join("")}
    </div>
    <div class="btn-row" style="margin-top:14px"><button class="btn primary" id="doGrades">${t("saveBtn")}</button><button class="btn" id="cancelModal">${t("cancelBtn")}</button></div>`);
  $("#doGrades").onclick = () => {
    (c.members || []).forEach((m, i) => {
      const v = $(`#grade-${i}`).value.trim();
      const key = normEmail(m.email);
      if (v === "") delete a.grades[key];
      else {
        const n = Number(v);
        if (isNaN(n) || n < 0 || n > a.points) { toast(t("gradeRange").replace("{m}", a.points)); return; }
        a.grades[key] = n;
      }
    });
    save(LS_CLASSES, classes); closeModal(); render(); toast(t("gradesSaved"), true);
  };
}

/* ---------- Rendering ---------- */
function filteredClasses(list) {
  const q = state.search.trim().toLowerCase();
  if (!q) return list;
  return list.filter(c => [c.name, c.subject, c.section, c.description, c.code].join(" ").toLowerCase().includes(q));
}

function render() {
  updateTopAvatar();
  applyStaticI18n();
  $$(".nav-btn[data-route]").forEach(b => b.classList.toggle("active", b.dataset.route === state.route));
  $("#sideClassList").innerHTML = myClasses().slice(0, 10).map(c =>
    `<button class="side-class-item" data-open="${c.id}"><span class="dot" style="${bannerStyle(c.color)}"></span><span>${esc(c.name)}${isOwner(c) ? "" : ""}</span></button>`).join("")
    + (window.Cloud ? Cloud.sideHTML() : "");

  const v = $("#view");
  if (state.route === "home") v.innerHTML = viewHome();
  else if (state.route === "todo") v.innerHTML = viewTodo();
  else if (state.route === "calendar") v.innerHTML = viewCalendar();
  else if (state.route === "archived") v.innerHTML = viewArchived();
  else if (state.route === "settings") v.innerHTML = viewSettings();
  else if (state.route === "class") v.innerHTML = viewClass();
  else if (state.route === "cloud") v.innerHTML = (window.Cloud ? Cloud.viewClass() : viewHome());
  bindCommon();
  if (window.Cloud) { Cloud.onRoute(); Cloud.bindCommon(); }
}

function classCard(c) {
  const pending = c.assignments.filter(a => !a.done).length;
  return `<div class="class-card" data-open="${c.id}">
    <div class="class-banner" style="${bannerStyle(c.color)}"><h3>${esc(c.name)}</h3><small>${esc([c.subject, c.section].filter(Boolean).join(" · ")) || "&nbsp;"}</small></div>
    <div class="class-body"><p>${esc(c.teacher ? c.teacher.firstName + " " + c.teacher.lastName : "")} · ${pending} ${t("pendingWord")}</p><span class="muted">›</span></div>
  </div>`;
}

function viewHome() {
  const list = filteredClasses(myClasses());
  const cloudTop = (window.Cloud ? Cloud.homeHTML() : "");
  return `${cloudTop}<div class="page-head"><div><h1>${t("home")}</h1><p>${profile ? `${t("signedInAs")} ${esc(profile.firstName)} ${esc(profile.lastName)}` : ""}</p></div>
    <div class="btn-row"><button class="btn" id="bJoin">${t("joinClass")}</button><button class="btn primary" id="bCreate">${t("createClass")}</button></div></div>
  ${list.length ? `<div class="grid">${list.map(classCard).join("")}</div>` :
      `<div class="empty"><h3>${t("noClasses")}</h3><p>${t("noClassesSub")}</p>
    <div class="btn-row" style="justify-content:center;margin-top:12px"><button class="btn primary" id="bCreate2">${t("createClass")}</button><button class="btn" id="bDemo">${t("loadDemo")}</button></div></div>`}`;
}

function allAssignments() {
  const out = [];
  myClasses().forEach(c => c.assignments.forEach(a => out.push({ ...a, className: c.name, classId: c.id, classColor: c.color })));
  return out.sort((a, b) => {
    const da = parseDue(a), db = parseDue(b);
    if (da && db) return da - db;
    if (da) return -1;
    if (db) return 1;
    return 0;
  });
}

function viewTodo() {
  const q = state.search.toLowerCase();
  const list = allAssignments().filter(a => !q || (a.title + a.desc + a.className).toLowerCase().includes(q));
  const pending = list.filter(a => !a.done);
  return `<div class="page-head"><div><h1>${t("todoTitle")}</h1><p>${tf("pendingIn", { n: pending.length, m: myClasses().length })}</p></div></div>
  ${list.length ? list.map(a => `<div class="assign ${a.done ? "done" : ""}">
    <div class="todo-item"><input type="checkbox" data-done="${a.classId}:${a.id}" ${a.done ? "checked" : ""} />
    <div style="flex:1"><strong>${esc(a.title)}</strong> <span class="chip solid">${esc(a.className)}</span>
    <div class="muted" style="font-size:13px;margin-top:4px">${esc(fmtDue(a))} · ${a.points} ${t("pts")}</div>
    ${a.desc ? `<p>${esc(a.desc)}</p>` : ""}</div></div></div>`).join("") : `<div class="empty">${t("nothingTodo")}</div>`}`;
}

function viewCalendar() {
  const y = state.calYear, m = state.calMonth;
  const monthName = new Date(y, m, 1).toLocaleString(locale(), { month: "long", year: "numeric" });
  const first = new Date(y, m, 1);
  const startDay = (first.getDay() + 6) % 7; // Monday = 0
  const days = new Date(y, m + 1, 0).getDate();
  const today = new Date();

  const inMonth = allAssignments().filter(a => {
    const d = parseDue(a);
    return d && d.getFullYear() === y && d.getMonth() === m;
  });

  let cells = "";
  for (let i = 0; i < startDay; i++) cells += `<div class="cal-day out"></div>`;
  for (let d = 1; d <= days; d++) {
    const isToday = today.getFullYear() === y && today.getMonth() === m && today.getDate() === d;
    const items = inMonth.filter(a => parseDue(a).getDate() === d);
    cells += `<div class="cal-day ${isToday ? "today" : ""}"><span class="dnum">${d}</span>${items.map(a =>
      `<button class="cal-dot" data-goto="${a.classId}" title="${esc(a.title)} – ${esc(a.className)}">${esc(a.title.slice(0, 22))}</button>`
    ).join("")}</div>`;
  }

  const sorted = [...inMonth].sort((a, b) => parseDue(a) - parseDue(b));
  return `<div class="page-head"><div><h1>${t("calendarTitle")}</h1><p>${t("calendarSub")}</p></div></div>
  <div class="card">
    <div class="cal-head">
      <button class="btn small" id="calPrev">‹ ${t("prev")}</button>
      <h2>${esc(monthName)}</h2>
      <button class="btn small" id="calNext">${t("next")} ›</button>
      <button class="btn small" id="calToday">${t("today")}</button>
    </div>
    <div class="cal-week">${[0, 1, 2, 3, 4, 5, 6].map(i => `<span>${esc(new Date(2024, 0, 1 + i).toLocaleString(locale(), { weekday: "short" }))}</span>`).join("")}</div>
    <div class="cal-grid">${cells}</div>
    <div class="cal-list">
      <h3 style="font-size:14px;margin:14px 0 8px">${tf("dueIn", { m: monthName })} (${sorted.length})</h3>
      ${sorted.length ? sorted.map(a => {
        const d = parseDue(a);
        return `<div class="person-row"><span class="dot" style="${bannerStyle(a.classColor)}"></span>
          <div style="flex:1"><strong>${esc(a.title)}</strong><div class="muted">${esc(a.className)} · ${d.toLocaleDateString(locale())} ${d.toLocaleTimeString(locale(), { hour: "2-digit", minute: "2-digit" })}</div></div>
          <button class="btn small" data-goto="${a.classId}">${t("open")}</button></div>`;
      }).join("") : `<p class="muted">${t("noDueMonth")}</p>`}
    </div>
  </div>`;
}

function viewArchived() {
  const list = filteredClasses(classes.filter(c => c.archived));
  return `<div class="page-head"><div><h1>${t("archivedTitle")}</h1><p>${t("archivedSub")}</p></div></div>
  ${list.length ? `<div class="grid">${list.map(classCard).join("")}</div>` : `<div class="empty">${t("noArchived")}</div>`}${window.Cloud ? Cloud.archivedExtra() : ""}`;
}

function viewSettings() {
  return `<div class="page-head"><div><h1>${t("settingsTitle")}</h1><p>${t("settingsSub")}</p></div></div>
  ${window.Cloud ? Cloud.accountCardHTML() : ""}
  <div class="two-col">
    <div>
      <div class="card"><h3>${t("appearance")}</h3><p class="muted">${t("appearanceSub")}</p>
        <div class="theme-options">
          ${["system", "light", "dark"].map(x => `<div class="theme-card ${theme === x ? "selected" : ""}" data-theme-pick="${x}"><div style="font-size:20px">${x === "system" ? "◐" : x === "light" ? "○" : "●"}</div><strong>${x === "system" ? t("sysTheme") : x === "light" ? t("lightTheme") : t("darkTheme")}</strong><div class="muted" style="font-size:12px">${x === "system" ? t("followDevice") : x === "light" ? t("alwaysLight") : t("alwaysDark")}</div></div>`).join("")}
        </div></div>
      <div class="card" style="margin-top:16px"><h3>${t("language")}</h3><p class="muted">${t("languageSub")}</p>
        <div class="lang-grid">
          ${Object.keys(LANGS).map(l => `<div class="lang-card ${lang === l ? "selected" : ""}" data-lang-pick="${l}"><strong>${LANGS[l]}</strong><div class="muted" style="font-size:12px">${l.toUpperCase()}</div></div>`).join("")}
        </div></div>
    </div>
    <div>
      <div class="card"><h3>${t("profileSec")}</h3>
        ${profile ? `<dl class="kv"><dt>${t("nameLbl")}</dt><dd>${esc(profile.firstName)} ${esc(profile.lastName)}</dd><dt>${t("emailWord")}</dt><dd>${esc(profile.email)}</dd><dt>${t("roleLbl")}</dt><dd>${profile.role === "teacher" ? t("teacherRole") : t("studentRole")}</dd><dt>${t("bioWord")}</dt><dd>${esc(profile.bio || "-")}</dd></dl>
        <div class="btn-row" style="margin-top:12px"><button class="btn primary" id="editProfile">${t("editProfile")}</button></div>`
          : `<p class="muted">${t("noProfile")}</p><button class="btn primary" id="editProfile">${t("createProfile")}</button>`}
      </div>
      <div class="card" style="margin-top:16px"><h3>${t("dataSec")}</h3><p class="muted">${t("dataSub")}</p>
        <div class="btn-row"><button class="btn small" id="exportBtn">${t("exportBtn")}</button><button class="btn small" id="importBtn">${t("importBtn")}</button><button class="btn small danger" id="wipeBtn">${t("wipeBtn")}</button></div>
        <input type="file" id="importFile" accept="application/json" hidden />
      </div>
      <div class="card" style="margin-top:16px"><h3>⟳ ${t("updates")}</h3><p class="muted">${t("updatesSub")} <span class="muted" id="scVer"></span></p>
        <div class="btn-row"><button class="btn small" id="checkUpdBtn">${t("checkUpdates")}</button></div>
      </div>
      <div class="card" style="margin-top:16px"><h3>⚖ ${t("legal")}</h3><p class="muted">${t("legalSub")}</p>
        <div class="btn-row"><button class="btn small" id="termsBtn">${t("termsBtn")}</button><button class="btn small" id="privBtn">${t("privBtn")}</button><button class="btn small" id="cookieBtn">${t("cookieBtn")}</button></div>
      </div>
    </div>
  </div>`;
}

function viewClass() {
  const c = getClass(state.classId);
  if (!c) { state.route = "home"; return viewHome(); }
  const tab = state.tab;
  const owner = isOwner(c);
  let body = "";
  if (tab === "stream") {
    body = `<div class="two-col">
      <div class="card"><h3>${t("codeTitle")}</h3><p class="muted">${t("shareCode")}</p>
        <div style="font-size:24px;font-weight:700;letter-spacing:.12em">${esc(c.code)}</div>
        <div class="btn-row" style="margin-top:10px"><button class="btn small" id="copyCode">${t("copyCode")}</button>${owner ? `<button class="btn small" id="archBtn">${c.archived ? t("unarchiveBtn") : t("archiveBtn")}</button>` : `<button class="btn small" id="leaveBtn">${t("leaveBtn")}</button>`}</div>
        <hr style="border:0;border-top:1px solid var(--border);margin:14px 0" />
        <h3>${t("aboutTitle")}</h3><p class="muted">${esc(c.description || t("noDesc"))}</p>
        <p class="muted">${esc(c.room || "-")} · ${c.members.length} ${t("membersWord")}</p></div>
      <div>
        ${owner ? `<div class="btn-row" style="margin-bottom:12px"><button class="btn primary" id="newPost">${t("newAnnounceBtn")}</button><button class="btn" id="newAssign">${t("newHwBtn")}</button></div>` : `<p class="muted" style="margin:0 0 12px">${t("onlyOwner")}</p>`}
        ${c.posts.length ? sortedPosts(c).map(p => {
          const author = memberByEmail(c, p.authorEmail) || { firstName: p.authorName?.[0] || "?", lastName: "", pfp: p.authorPfp || null };
          const hw = p.kind === "hw";
          return `<div class="post${p.pinned ? " pinned" : ""}"><div class="post-head">${avatarHTML(author)}<div><strong>${esc(p.authorName)}</strong><div class="muted" style="font-size:12px">${esc(new Date(p.date).toLocaleString(locale()))}</div></div>${p.pinned ? `<span class="hw-badge">📌 ${t("pinBadge")}</span>` : ""}${hw ? `<span class="hw-badge">✏ ${t("hwBadge")}</span>` : ""}${owner ? `<button class="icon-btn sm pin-btn" data-pin="${p.id}" title="${p.pinned ? t("unpin") : t("pin")}">${p.pinned ? "📌" : "📍"}</button>` : ""}</div>${hw ? `<p style="margin:6px 0 2px"><strong>${esc(p.hwTitle || "")}</strong></p><p class="muted" style="margin:0 0 4px;font-size:13px">${p.hwDue ? esc(new Date(p.hwDue).toLocaleString(locale())) : esc(t("noDueDate"))}</p>` : ""}<p style="margin:6px 0 0">${esc(p.text)}</p>${commentsHTML(p.comments, "p", p.id)}</div>`;
        }).join("") : `<div class="empty">${t("noAnnounce")}</div>`}
      </div></div>`;
  } else if (tab === "classwork") {
    const avg = myAverage(c);
    body = `${owner ? `<div class="btn-row" style="margin-bottom:12px"><button class="btn primary" id="newAssign">${t("newHwBtn")}</button></div>` : `<p class="muted" style="margin:0 0 12px">${t("onlyOwner")}</p>`}
    ${avg ? `<div class="card avg-card"><strong>★ ${t("yourAverage")}: ${avg.avg.toFixed(1)}</strong><span class="muted"> · ${avg.n} ${t("grades").toLowerCase()}</span></div>` : ""}
    ${c.assignments.length ? c.assignments.map(a => {
      const g = myGrade(a);
      return `<div class="assign ${a.done ? "done" : ""}">
      <div class="assign-head"><div style="flex:1"><strong>${esc(a.title)}</strong><div class="muted" style="font-size:13px">${esc(fmtDue(a))} · ${a.points} ${t("pts")}</div></div>
      ${g !== null ? `<span class="grade-chip">★ ${g}/${a.points}</span>` : (a.points > 0 ? `<span class="grade-chip dim">${t("notGraded")}</span>` : "")}
      <button class="btn small" data-toggle="${a.id}">${a.done ? t("reopenBtn") : t("markDone")}</button>
      ${owner ? `<button class="btn small" data-grade="${a.id}">${t("setGrades")}</button><button class="btn small danger" data-delassign="${a.id}">${t("deleteBtn")}</button>` : ""}</div>
      ${a.desc ? `<p style="margin:6px 0 0">${esc(a.desc)}</p>` : ""}${commentsHTML(a.comments, "a", a.id)}</div>`;
    }).join("") : `<div class="empty">${t("noHw")}</div>`}`;
  } else {
    body = `<div class="card"><h3>${t("teacherWord")}</h3><div class="person-row">${avatarHTML(c.teacher)}<div><strong>${esc(c.teacher?.firstName + " " + c.teacher?.lastName)}</strong><div class="muted">${esc(c.teacher?.email || "")}</div></div></div>
      <h3 style="margin-top:16px">${t("membersTitle")} (${c.members.length})</h3>
      ${c.members.map(m => `<div class="person-row">${avatarHTML(m)}<div><strong>${esc(m.firstName)} ${esc(m.lastName)}</strong><div class="muted">${esc(m.email)} · ${m.role === "teacher" ? t("teacherRole") : t("studentRole")}</div></div></div>`).join("")}
      ${owner ? `<div class="btn-row" style="margin-top:12px"><button class="btn small" id="addMember">${t("addMemberBtn")}</button></div>` : ""}</div>`;
  }
  return `<button class="btn small" id="backHome">‹ ${t("backAll")}</button>
  <div class="banner-hero" style="${bannerStyle(c.color)};margin-top:12px"><h1>${esc(c.name)}</h1><p>${esc([c.subject, c.section, c.room].filter(Boolean).join(" · "))}</p>
    <div class="class-meta"><span class="chip">${esc(c.code)}</span><span class="chip">${c.members.length} ${t("membersWord")}</span><span class="chip">${c.assignments.filter(a => !a.done).length} ${t("pendingWord")}</span></div></div>
  <div class="tabs"><button class="tab ${tab === "stream" ? "active" : ""}" data-tab="stream">${t("tabStream")}</button><button class="tab ${tab === "classwork" ? "active" : ""}" data-tab="classwork">${t("tabClasswork")}</button><button class="tab ${tab === "people" ? "active" : ""}" data-tab="people">${t("tabPeople")}</button></div>
  ${body}`;
}

/* ---------- events ---------- */
function bindCommon() {
  $("#bCreate")?.addEventListener("click", openCreateClass);
  $("#bCreate2")?.addEventListener("click", openCreateClass);
  $("#bJoin")?.addEventListener("click", openJoinClass);
  $("#bDemo")?.addEventListener("click", seedDemo);
  $("#backHome")?.addEventListener("click", () => { state.route = "home"; render(); });
  $$("#view [data-open]").forEach(el => el.onclick = (e) => { celebrateEvent(e, 8); state = { ...state, route: "class", classId: el.dataset.open, tab: "stream" }; render(); });
  $$("#sideClassList [data-open]").forEach(el => el.onclick = () => { state = { ...state, route: "class", classId: el.dataset.open, tab: "stream" }; document.body.classList.remove("nav-open"); render(); });
  $$("[data-tab]").forEach(b => b.onclick = (e) => { celebrateEvent(e, 5); state.tab = b.dataset.tab; render(); });
  $$("[data-goto]").forEach(b => b.onclick = () => { state = { ...state, route: "class", classId: b.dataset.goto, tab: "classwork" }; render(); });
  $("#newPost")?.addEventListener("click", () => openPostModal(state.classId));
  $("#newAssign")?.addEventListener("click", () => openAssignModal(state.classId));
  $("#copyCode")?.addEventListener("click", (e) => { const c = getClass(state.classId); navigator.clipboard?.writeText(c.code); celebrateEvent(e, 8); toast(t("codeCopied") + c.code); });
  $("#archBtn")?.addEventListener("click", (e) => {
    const c = getClass(state.classId);
    if (!isOwner(c)) { toast(t("onlyOwner")); return; }
    c.archived = !c.archived; save(LS_CLASSES, classes);
    state.route = c.archived ? "home" : "class"; render();
    celebrateEvent(e, 10); toast(c.archived ? t("archivedToast") : t("restoredToast"));
  });
  $("#leaveBtn")?.addEventListener("click", () => {
    const c = getClass(state.classId);
    classes.find(x => x.id === c.id).members = c.members.filter(m => (m.email || "").toLowerCase() !== (profile.email || "").toLowerCase());
    save(LS_CLASSES, classes); state.route = "home"; render(); toast(t("leftMsg"));
  });
  $$("[data-toggle]").forEach(b => b.onclick = (e) => {
    const c = getClass(state.classId);
    const a = c.assignments.find(x => x.id === b.dataset.toggle);
    a.done = !a.done; save(LS_CLASSES, classes); render();
    celebrateEvent(e, a.done ? 14 : 6); toast(a.done ? t("markedDone") : t("reopenedMsg"), a.done);
  });
  $$("[data-delassign]").forEach(b => b.onclick = () => {
    const c = getClass(state.classId);
    if (!isOwner(c)) { toast(t("onlyOwner")); return; }
    if (!confirm(t("delConfirm"))) return;
    c.assignments = c.assignments.filter(x => x.id !== b.dataset.delassign);
    save(LS_CLASSES, classes); render();
  });
  $$("[data-pin]").forEach(b => b.onclick = (e) => {
    const c = getClass(state.classId);
    if (!isOwner(c)) { toast(t("onlyOwner")); return; }
    const p = c.posts.find(x => x.id === b.dataset.pin);
    if (p) { p.pinned = !p.pinned; save(LS_CLASSES, classes); render(); celebrateEvent(e, 8); toast(p.pinned ? t("pin") : t("unpin"), p.pinned); }
  });
  $$("[data-grade]").forEach(b => b.onclick = () => openGradeModal(state.classId, b.dataset.grade));
  $$("[data-sendcomment]").forEach(b => b.onclick = () => {
    const c = getClass(state.classId);
    if (!c || !profile) return;
    const [kind, id] = b.dataset.sendcomment.split(":");
    const input = document.querySelector(`[data-cinput="${kind}:${id}"]`);
    const text = (input?.value || "").trim();
    if (!text) return;
    const cm = { id: uid(), authorName: profile.firstName + " " + profile.lastName, authorEmail: profile.email, authorPfp: profile.pfp || null, text, date: new Date().toISOString() };
    const target = kind === "p" ? c.posts.find(x => x.id === id) : c.assignments.find(x => x.id === id);
    if (!target) return;
    if (!target.comments) target.comments = [];
    target.comments.push(cm);
    save(LS_CLASSES, classes); render(); celebrateEvent(b, 6);
  });
  $$("[data-cinput]").forEach(inp => inp.onkeydown = (e) => {
    if (e.key === "Enter") {
      const btn = document.querySelector(`[data-sendcomment="${inp.dataset.cinput}"]`);
      btn?.click();
    }
  });
  $$("[data-done]").forEach(ch => ch.onchange = (e) => {
    const [cid, aid] = ch.dataset.done.split(":");
    const c = getClass(cid);
    const a = c.assignments.find(x => x.id === aid);
    a.done = ch.checked; save(LS_CLASSES, classes); render();
    celebrateEvent(e, a.done ? 12 : 5); toast(ch.checked ? t("markedDone") : t("reopenedMsg"), ch.checked);
  });
  $("#calPrev")?.addEventListener("click", () => { state.calMonth--; if (state.calMonth < 0) { state.calMonth = 11; state.calYear--; } render(); });
  $("#calNext")?.addEventListener("click", () => { state.calMonth++; if (state.calMonth > 11) { state.calMonth = 0; state.calYear++; } render(); });
  $("#calToday")?.addEventListener("click", () => { const d = new Date(); state.calYear = d.getFullYear(); state.calMonth = d.getMonth(); render(); });
  $("#addMember")?.addEventListener("click", () => {
    const c = getClass(state.classId);
    if (!isOwner(c)) { toast(t("onlyOwner")); return; }
    openModal(`<h2>${t("addMemberTitle")}</h2><p class="muted">${t("addMemberSub")}</p><label>${t("nameLbl")}</label><input id="mName" type="text" /><label>${t("emailLbl2")}</label><input id="mEmail" type="email" /><div class="btn-row" style="margin-top:14px"><button class="btn primary" id="doAddM">${t("addBtn")}</button><button class="btn" id="cancelModal">${t("cancelBtn")}</button></div>`);
    $("#doAddM").onclick = (e) => {
      const n = $("#mName").value.trim().split(" ");
      c.members.push({ firstName: n[0] || "Student", lastName: n.slice(1).join(" ") || "", email: $("#mEmail").value.trim() || "no-email", role: "student" });
      save(LS_CLASSES, classes); closeModal(); render(); celebrateEvent(e, 10);
    };
  });
  $$("[data-theme-pick]").forEach(el => el.onclick = (e) => { theme = el.dataset.themePick; applyTheme(); render(); celebrateEvent(e, 6); toast(t("themeWord") + theme); });
  $$("[data-lang-pick]").forEach(el => el.onclick = (e) => { setLang(el.dataset.langPick); celebrateEvent(e, 8); });
  $("#editProfile")?.addEventListener("click", () => openProfileModal(false));
  const openLegal = (title, body) => openModal(`<h2>${esc(title)}</h2><div class="legal-body">${esc(body)}</div><div class="btn-row" style="margin-top:14px"><button class="btn primary" id="cancelModal">${t("closeBtn")}</button></div>`);
  $("#termsBtn")?.addEventListener("click", () => openLegal(t("termsBtn"), (window.LEGAL ? LEGAL.terms : "")));
  $("#privBtn")?.addEventListener("click", () => openLegal(t("privBtn"), (window.LEGAL ? LEGAL.privacy : "")));
  $("#cookieBtn")?.addEventListener("click", () => openLegal(t("cookieBtn"), (window.LEGAL ? LEGAL.cookies : "")));
  $("#exportBtn")?.addEventListener("click", () => {
    const blob = new Blob([JSON.stringify({ profile, classes }, null, 2)], { type: "application/json" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "students-class-backup.json"; a.click();
  });
  $("#importBtn")?.addEventListener("click", () => $("#importFile").click());
  $("#importFile")?.addEventListener("change", e => {
    const f = e.target.files[0]; if (!f) return; const r = new FileReader();
    r.onload = () => { try { const d = JSON.parse(r.result); if (d.profile) profile = d.profile; if (d.classes) classes = d.classes; classes.forEach(c => { if (!c.ownerEmail) c.ownerEmail = (c.teacher && c.teacher.email) || ""; }); saveAll(); updateTopAvatar(); render(); toast(t("backupImported"), true); } catch { toast(t("invalidFile")); } };
    r.readAsText(f);
  });
  $("#wipeBtn")?.addEventListener("click", () => {
    if (!confirm(t("confirmWipe"))) return;
    localStorage.removeItem(LS_PROFILE); localStorage.removeItem(LS_CLASSES);
    profile = null; classes = []; saveAll(); render(); openProfileModal(true);
  });
  // App updates (desktop only — needs electron preload bridge)
  if (window.SCAPI) {
    window.SCAPI.appVersion().then(v => {
      const el = $("#scVer"); if (el && v) el.textContent = " · v" + v;
    }).catch(() => {});
    if (!window.__scUpdListener) {
      window.__scUpdListener = true;
      window.SCAPI.onUpdateResult((r) => {
        if (!r) return;
        if (r.status === "uptodate") toast("✓ " + t("upToDate"), true);
        else if (r.status === "downloading") toast(t("downloadingUpdate") + (r.version ? " " + r.version : ""));
        else if (r.status === "error") toast(t("updateError"));
      });
    }
  } else {
    const vb = $("#checkUpdBtn");
    if (vb) vb.style.display = "none"; // web version: no updater
  }
  $("#checkUpdBtn")?.addEventListener("click", async () => {
    if (!window.SCAPI) return;
    toast(t("checkingUpdates"));
    try { await window.SCAPI.checkUpdates(); }
    catch (e) { toast(t("updateError")); }
  });
}

/* ---------- global wiring ---------- */
$("#createClassBtn").addEventListener("click", () => { document.body.classList.remove("nav-open"); openCreateClass(); });
$("#joinClassBtn").addEventListener("click", () => { document.body.classList.remove("nav-open"); openJoinClass(); });
$("#avatarBtn").addEventListener("click", () => openProfileModal(false));
$("#brandHome").addEventListener("click", () => { state.route = "home"; render(); });
$("#quickThemeBtn").addEventListener("click", cycleTheme);
$("#menuBtn").addEventListener("click", () => document.body.classList.toggle("nav-open"));
$("#scrim").addEventListener("click", () => document.body.classList.remove("nav-open"));
$$(".nav-btn[data-route]").forEach(b => b.addEventListener("click", () => { state.route = b.dataset.route; state.classId = null; document.body.classList.remove("nav-open"); render(); }));
let searchTimer = null;
$("#searchInput").addEventListener("input", e => {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(() => {
    state.search = e.target.value;
    if (state.route === "class") state.route = "home";
    const pos = e.target.selectionStart;
    render();
    const s = $("#searchInput"); s.focus();
    try { s.setSelectionRange(pos, pos); } catch { }
  }, 120);
});

/* ---------- Due-date reminders (local homework, once per item per day) ---------- */
const LS_NOTIFIED = "sc_notified_v1";
function checkReminders() {
  try {
    if (typeof Notification === "undefined") return;
    if (Notification.permission === "denied") return;
    const go = () => {
      const now = Date.now(), day = new Date().toDateString();
      let seen = {};
      try { seen = JSON.parse(localStorage.getItem(LS_NOTIFIED) || "{}"); } catch (e) {}
      let changed = false;
      myClasses().forEach(c => (c.assignments || []).forEach(a => {
        if (a.done) return;
        const d = parseDue(a);
        if (!d) return;
        const ms = d - now;
        if (ms < 0 || ms > 24 * 3600 * 1000) return;
        if (seen[a.id] === day) return;
        seen[a.id] = day; changed = true;
        try { new Notification("⏰ " + a.title, { body: t("dueSoon") + " · " + c.name + " · " + fmtDue(a) }); } catch (e) {}
      }));
      if (changed) { try { localStorage.setItem(LS_NOTIFIED, JSON.stringify(seen)); } catch (e) {} }
    };
    if (Notification.permission === "default") { try { Notification.requestPermission().then(go).catch(() => {}); } catch (e) { go(); } }
    else go();
  } catch (e) {}
}

/* ---------- init ---------- */
document.documentElement.lang = lang;
applyTheme();
applyStaticI18n();
updateTopAvatar();
render();
if (!profile) openProfileModal(true);
setTimeout(checkReminders, 4000);
setInterval(checkReminders, 3600 * 1000);
