export default class Imageview {
  state = null;

  constructor({ $target, onClose }) {
    this.$Imageview = document.createElement('div');
    this.$Imageview.classList.add('Imageview');
    this.onClose = onClose;

    this.$Imageview.addEventListener('click', (e) => {
      if (e.target.className === 'Modal') onClose();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') onClose();
    });

    $target.appendChild(this.$Imageview);
  }

  setState(next) {
    this.state = next;
    this.render();
  }

  render() {
    if (this.state)
      this.$Imageview.innerHTML = `
            <div class='Modal'>
                <div>
                    <img src='https://fe-dev-matching-2021-03-serverlessdeploymentbuck-1ooef0cg8h3vq.s3.ap-northeast-2.amazonaws.com/public${
                      this.state
                    }' onerror="alert('Internal server error'); this.parentElement.parentElement.remove(); ${this.onClose()} " />
                </div>
            </div>
        `;
    else this.$Imageview.innerHTML = '';
  }
}
