import api from './api.js';
import Breadcrumb from './Breadcrumb.js';
import Nodes from './Nodes.js';
import Imageview from './Imageview.js';
import Loading from './Loading.js';

export default class App {
  state = {
    isRoot: true,
    dirNodes: [],
    currentNodes: [],
    imagePath: null,
    loading: false,
    error: false,
  };

  cache = {};
  constructor($target) {
    this.$BreadCrumb = new Breadcrumb({
      $target,
      onClickCrumb: (id) => {
        const dirNodes = [...this.state.dirNodes];

        while (dirNodes[dirNodes.length - 1].id !== id) dirNodes.pop();
        if (id === 'root')
          this.setState({
            ...this.state,
            isRoot: true,
            dirNodes,
            currentNodes: this.cache[id],
            error: false,
          });
        else
          this.setState({
            ...this.state,
            dirNodes,
            currentNodes: this.cache[id],
            error: false,
          });
      },
    });

    this.$Nodes = new Nodes({
      $target,
      onClickNode: async (node) => {
        if (node.type === 'DIRECTORY') {
          if (this.cache[node.id]) {
            this.setState({
              ...this.state,
              isRoot: false,
              dirNodes: [...this.state.dirNodes, node],
              currentNodes: this.cache[node.id],
            });

            return;
          }

          try {
            this.setState({ ...this.state, loading: true });
            const data = await api.fetchNode(node.id);
            this.setState({
              ...this.state,
              isRoot: false,
              dirNodes: [...this.state.dirNodes, node],
              currentNodes: data,
              loading: false,
            });
            this.cache[node.id] = data;
          } catch (e) {
            this.setState({
              ...this.state,
              loading: false,
              error: true,
            });
          }
        } else if (node.type === 'FILE') {
          this.setState({
            ...this.state,
            imagePath: node.filePath,
          });
        }
      },
      onClickPrev: () => {
        const prevDirNodes = [...this.state.dirNodes];
        prevDirNodes.pop();
        const id = prevDirNodes[prevDirNodes.length - 1].id;

        if (id === 'root')
          this.setState({
            ...this.state,
            isRoot: true,
            dirNodes: prevDirNodes,
            currentNodes: this.cache[id],
          });
        else
          this.setState({
            ...this.state,
            isRoot: false,
            dirNodes: prevDirNodes,
            currentNodes: this.cache[id],
          });
      },
    });

    this.$Imageview = new Imageview({
      $target,
      onClose: () => {
        this.setState({ ...this.state, imagePath: null });
      },
    });
    this.$Loading = new Loading({ $target });

    this.init();
  }

  setState(next) {
    this.state = next;
    this.$BreadCrumb.setState(this.state.dirNodes);
    this.$Nodes.setState({
      isRoot: this.state.isRoot,
      currentNodes: this.state.currentNodes,
      error: this.state.error,
    });
    this.$Imageview.setState(this.state.imagePath);
    this.$Loading.setState(this.state.loading);
  }

  async init() {
    try {
      this.setState({
        ...this.state,
        loading: true,
      });
      const data = await api.fetchRoot();
      this.setState({
        ...this.state,
        dirNodes: [{ id: 'root', name: 'root' }],
        currentNodes: data,
        loading: false,
      });
      this.cache.root = data;
    } catch (e) {
      this.setState({
        ...this.state,
        loading: false,
        error: true,
      });
    }
  }
}
