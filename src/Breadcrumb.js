export default class Breadcrumb {
  state = [];

  constructor({ $target, onClickCrumb }) {
    this.$BreadCrumb = document.createElement('nav');
    this.$BreadCrumb.classList.add('Breadcrumb');

    this.$BreadCrumb.addEventListener('click', (e) => {
      const crumb = e.target.closest('.Crumb');
      if (crumb) {
        const id = crumb.dataset.id;
        if (this.state[this.state.length - 1].id === id) return;
        else onClickCrumb(id);
      }
    });

    $target.appendChild(this.$BreadCrumb);
  }

  setState(next) {
    this.state = next;
    this.render();
  }

  render() {
    this.$BreadCrumb.innerHTML = this.state
      .map(
        (crumb, index) =>
          `<div class='Crumb' data-id=${crumb.id}>
                ${crumb.name}
            </div>`
      )
      .join('');
  }
}
