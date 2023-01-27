export default function FetchBuilder(path) {
  this.path = path;

  this.params = new URLSearchParams();

  this.setId = (id) => {
    if (id) this.params.append('id', id);
  };

  this.setQuery = (query) => {
    if (query) {
      this.params.append('q', query);
    }
  };

  this.setChildrenRelations = (relations) => {
    if (Array.isArray(relations) && relations.length > 0) {
      this.params.append('_embed', relations.join(','));
    }
  };

  this.setParentRelations = (relations) => {
    if (Array.isArray(relations) && relations.length > 0) {
      this.params.append('_expand', relations.join(','));
    }
  };

  this.getParams = () => {
    return this.params;
  };

  this.getPath = () => this.path;

  this.setSignal = (controller) => (this.signal = controller.signal);
}
