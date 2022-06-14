export default (imageUrl: string) => {
  /**
   * Temporarily this formatting should be applied since the image value is returned
   * as `localhost/storage/imageName.jpg`
   * */
  if (imageUrl) {
    const urlParts = imageUrl.split('/');
    const imageName = urlParts[urlParts.length - 1];
    const eventsApi = `http://127.0.0.1:8001`;
  
    return `${eventsApi}/storage/${imageName}`;
  }

  return '';
}