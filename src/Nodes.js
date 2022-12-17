export default class Nodes {
  state = {};

  constructor({ $target, onClickNode, onClickPrev }) {
    this.$Nodes = document.createElement('div');
    this.$Nodes.classList.add('Nodes');

    this.$Nodes.addEventListener('click', (e) => {
      const node = e.target.closest('.Node');
      if (node) {
        const id = node.dataset.id;
        if (id) {
          const selectedNode = this.state.currentNodes.find(
            (node) => node.id === id
          );
          onClickNode(selectedNode);
        } else onClickPrev();
      }
    });

    $target.appendChild(this.$Nodes);
  }

  setState(next) {
    this.state = next;
    this.render();
  }

  render() {
    if (this.state.error) {
      this.$Nodes.innerHTML = `
      <div>프로그래머스 서버 오류입니다. 새로고침 해주세요!</div>
      `;
      return;
    }
    const nodes = this.state.currentNodes
      .map((node, index) => {
        if (node.type === 'DIRECTORY')
          return `
          <div class='Node' data-id=${node.id}>
            <img src="./src/assets/directory.png" />
            <div>${node.name}</div>
          </div>
          `;
        else if (node.type === 'FILE')
          return `
          <div class='Node' data-id=${node.id}>
            <img src="./src/assets/file.png" />
            <div>${node.name}</div>
          </div>
          `;
      })
      .join('');

    this.$Nodes.innerHTML = this.state.isRoot
      ? nodes
      : `
      <div class="Node">
        <img src="./src/assets/prev.png" />
      </div>
      ${nodes}
      `;
  }
}
