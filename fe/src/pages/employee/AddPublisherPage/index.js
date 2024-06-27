const AddPublisherPage = () => {
    return (<>
    <>
      <h1>Thêm danh mục </h1>
      <form id="addPublisherForm">
        <label htmlFor="publisherName">Publisher Name:</label>
        <input type="text" id="publisherName" name="publisherName" required />
        <br />
        <label htmlFor="publisherWebsite">Website (Optional):</label>
        <input type="url" id="publisherWebsite" name="publisherWebsite" />
        <br />
        <label htmlFor="publisherLogo">Logo (Optional):</label>
        <input type="file" id="publisherLogo" name="publisherLogo" accept="image/*" />
        <br />
        <button type="submit">Add Publisher</button>
      </form>
    </>
    </>  );
}
 
export default AddPublisherPage ;