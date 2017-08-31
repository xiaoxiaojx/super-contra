class App {
    ele: HTMLElement = document.createElement("div");
    render() {
        document.getElementById("app").appendChild(this.ele);
    }
}

new App().render();