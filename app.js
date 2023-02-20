const $ = (selector) => document.querySelector(selector);
const searchInput = $('#search-input');

const makeItResponsive = () => {
    const deviceWidth = window.screen.width;
    let widthOfContent = document.getElementById('container');
    switch(true) {
       case deviceWidth >= 1366: widthOfContent.style.width = '45%';break;
       case deviceWidth >= 1266: widthOfContent.style.width = '70%';break;
       case deviceWidth >= 1150: widthOfContent.style.width = '75%';break;
       case deviceWidth >= 1074: widthOfContent.style.width = '80%';break;
       case deviceWidth >= 820:  widthOfContent.style.width = '85%';break;
       case deviceWidth >= 600:  widthOfContent.style.width = '90%';break;
       default : widthOfContent.style.width = '73%';
    }
}

const isValidHttpUrl = (url) => {
    try {
        const newUrl = new URL(url);
        return newUrl.protocol === 'http:' || newUrl.protocol === 'https:';
    }
    catch {
        return false;
    }
};

const display = (toShowData) => {
    if (typeof toShowData == 'string') {
        $('#result').textContent = toShowData;
        return;
    }
    let newUl = '<span class="largefont extra-padding">Framework detected</span><br/>';   
    if (toShowData.length < 1) {
        document.getElementById('result').innerHTML = '<span class="largefont extra-padding">Failed to detect any framework</span><br/>';
        return;
    } 
    for ( let element of toShowData) {
        const li = `<ul>
        <li><img src="./icons/${element.name}.png" /> <span class="largefont">${element.name}</span></li>
        <li>url: <a href="${element.url}" target="blank"> ${element.url}</a></li>
        <li>npm:  <a href="https://www.npmjs.com/package/${element.npm}" target="blank">https://www.npmjs.com/package/${element.npm}</a></li>
        <li>version: ${element.version}</li></ul> <br/>`
        newUl += li;
    }
    document.getElementById('Error').style.display = 'none'
    document.getElementById('result').innerHTML = newUl;
    toShowData = '';
}
  
const handleError = (error) => { $('#Error').textContent = `Error: '${error}'`; $('#Error').style.display = 'block'; }

const fetchFrameworkList = async (url) => {
    if (isValidHttpUrl(url)) {
        document.getElementById('Error').style.display = 'none'
        display('...loading please be patient...')
        try {
            const response = await fetch(`https://63f235a5eeaea5715f8d2291--ooogh.netlify.app/.netlify/functions/api/frameworkdetector?url=${url}`)
            if (response.status == 200) {
                response.json().then(res=>display(res));
            } else {
            handleError( new Error(`${response.status}`) );
            }   
        } catch (error) {
            handleError(error)
        }

    } else {
        $('#result').innerHTML = ''
        handleError(`${url}  is not a a valid HTTP URL.`)
    }
}

searchInput.addEventListener('input', (e) => {fetchFrameworkList(e.target.value)});
makeItResponsive();