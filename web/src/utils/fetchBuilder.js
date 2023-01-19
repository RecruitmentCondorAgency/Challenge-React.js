export default function FetchBuilder(path) {
  this.path = path;

  this.setId = (id) => (this.id = id);
  this.setQuery = (q) => (this.q = q);
  this.getPath = () => {
    const params = new URLSearchParams();

    if (this.id) {
      this.path += `/${this.id}`;
    } else if (this.q) {
      params.append('q', this.q);
      this.path += params.toString();
    }

    return this.path;
  };

  this.setSignal = (controller) => (this.signal = controller.signal);
}
