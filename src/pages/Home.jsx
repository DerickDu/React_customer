const Home = () => {
    if (localStorage.getItem('login') === false) {
        return
    }
    return <h1>Home</h1>;
};

export default Home;