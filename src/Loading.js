export default class Loading {
  state = false;

  constructor({ $target }) {
    this.$Loading = document.createElement('div');
    this.$Loading.classList.add('Modal', 'Loading');

    this.$Loading.innerHTML = `
            <div>
                <img src="./src/assets/loading.gif" />
            </div>
    `;

    $target.appendChild(this.$Loading);
  }

  setState(next) {
    this.state = next;
    this.render();
  }

  render() {
    this.$Loading.style.display = this.state ? 'block' : 'none';
  }
}
