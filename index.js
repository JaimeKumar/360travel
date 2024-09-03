var page = 'home';

function changePage(which) {
    var currentPath = window.location.pathname;
    currentPath = currentPath.replaceAll('/', '');
    if (currentPath.length < 1) {
        history.pushState({ page: which }, '', `/#${which}`);
    } else {
        history.pushState({ page: which }, '', `/${currentPath}/#${which}`);
    }
    loadPage(which);
}

function loadPage(which) {
    switch (which) {
        case '':
            which = 'home';
        case 'home':
            document.getElementById('bkg').classList.remove('bkgBlur');
            document.getElementById('bkgDark').classList.remove('bkgDarkOn');
            document.getElementById('menuButton').classList.add('onHome');
            document.getElementById('homeLinks').classList.remove('hideHome');
            break;
        default:
            document.getElementById('bkg').classList.add('bkgBlur');
            document.getElementById('bkgDark').classList.add('bkgDarkOn');
            document.getElementById('menuButton').classList.remove('onHome');
            document.getElementById('homeLinks').classList.add('hideHome');
            break;
    }

    var ids = {'home': "homeLink", 'vt': "viewTripLink", 'business-travel': "bizzLink", 'faqs': "faqLink", 'contact': "contactLink"};

    Object.values(ids).forEach(id => {
        document.getElementById(id).classList.remove('onPage');
    })

    document.getElementById('main').classList.remove('openMenu')
    document.getElementById('menuButton').classList.remove("change");

    document.getElementById('content').scrollTo(0, 0);

    document.getElementById(ids[which]).classList.add('onPage');

    updateContent(which);
}

function updateContent(which) {
    var idArray = {
        'home': "",
        'vt': "",
        'business-travel': "bizzTravel",
        'faqs': "faqs",
        'contact': "contact"
    }

    console.log('got to updateContent(' + which + ')')

    if (idArray[page]!="" && idArray[page]!=-1) {
        document.getElementById(idArray[page]).classList.remove('contentVisible');
        console.log('remove contVis on: ' + page);
    }

    if (idArray[which]!="" && idArray[which]!=-1) {
        document.getElementById(idArray[which]).classList.add('contentVisible');
        console.log('contVis on: ' + which);
    }

    page = which;
    contentScroll();
    if (which == 'contact') {
        unobfuscateLinks();
    }
}

function contentScroll() {
    const container = document.getElementById('content');
    const currentScrollPosition = container.scrollTop;
    const maxScrollPosition = container.scrollHeight - container.clientHeight;
    const showBlur = currentScrollPosition < maxScrollPosition - 10;
    if (showBlur) {
        container.classList.add('showBlur');
    } else {
        container.classList.remove('showBlur');
    }
}

function menuClick() {
    document.getElementById('menuButton').classList.toggle("change");
    document.getElementById('main').classList.toggle('openMenu')
}

function unobfuscateLinks() {
    var eP1 = '&#x62;&#x6f;&#x6f;&#x6b;&#x40;';
    var eP2 = '&#x33;&#x36;&#x30;&#x74;&#x72;&#x61;&#x76;';
    var eP3 = '&#x65;&#x6c;&#x2e;&#x63;&#x6f;&#x2e;&#x75;&#x6b;';

    var tp1 = '&#x2b;&#x34;&#x34;&#x20;&#x32;&#x30;&#x20;';
    var tp2 = '&#x37;&#x34;&#x33;&#x37;&#x20;&#x33;&#x36;&#x30;&#x31;';
    
    var eBase = `<i class="fa-solid fa-envelope"></i> ` + eP1 + eP2 + eP3;
    var tBase = `<i class="fa-solid fa-phone"></i> ` + tp1 + tp2;
    
    var email = decodeEntities(eP1 + eP2 + eP3);
    var phone = decodeEntities(tp1 + tp2);
    
    document.getElementById('mailLink').innerHTML = eBase;
    document.getElementById('mailLink').href = `mailto:` + email;
    document.getElementById('telLink').innerHTML = tBase;
    document.getElementById('telLink').href = `tel:` + phone;
}

function decodeEntities(encodedString) {
    var textArea = document.createElement('textarea');
    textArea.innerHTML = encodedString;
    return textArea.value;
}

window.addEventListener('popstate', function(event) {
    if (event.state && event.state.page) {
        loadPage(event.state.page);
    } else {
        loadPage('home');
    }
});

window.onload = () => {
    const currentYear = new Date().getFullYear();
    document.getElementById('yearUpdate').innerHTML = `© 360 Travel, ${currentYear}`

    setTimeout(() => {
        const hash = window.location.hash.replace(/^#|#$/g, '');
        loadPage(hash);
    }, 3000)
}