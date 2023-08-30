export default class Preloader {
    static show() {
        const element = document.getElementById('preloader');
        element.style.opacity = '1';
        element.style.visibility = 'visible';
    }

    static hide() {
        const element = document.getElementById('preloader');
        element.style.opacity = '0';
        element.style.visibility = 'hidden';
    }
}