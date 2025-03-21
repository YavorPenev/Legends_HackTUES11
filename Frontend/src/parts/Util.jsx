function Util() {
    useEffect(() => {
        const button = document.getElementById('themebutton');
        if (button) {
            button.className = 'main_buttons';
        }
    }, []);

    return null;
}

export default Util;