const Contact = () => {
    if (localStorage.getItem('login') === false) {
        return
    }
    return <h1>Contact Me</h1>;
};

export default Contact;