import Modal from "./Modal"

function List({
  item,
  handleSorting,
  getSortingIcon,
  open,
  handleOpen,
  handleClose,
  defaultValue,
  handleInputChange,
  handleSubmit
}) {
  console.log("defaultValue", defaultValue)
  return (
    <>
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-body">
            <table className="table-latitude">
              <thead>
                <th onClick={() => handleSorting("id")}># ID</th>
                <th onClick={() => handleSorting("label")}>Label</th>
                <th onClick={() => handleSorting("value")}>Value</th>
                <th>Action</th>
              </thead>
              <tbody>
                {item?.map((item, index) => (
                  <tr key={index}>
                    <th>{item.id}</th>
                    <td>{item.label}</td>
                    <td>{item.value}</td>
                    <td>
                      <button
                        className="btn btn-primary btn-round-1"
                        onClick={() => {
                          handleOpen(item.id)
                        }}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Modal isOpen={open} onClose={handleClose}>
        <>
          <div className="form-popup">
            <label htmlFor="fname">Label</label>
            <input
              type="text"
              id="label"
              name="label"
              placeholder="Please Enter Label"
              value={defaultValue.label}
              onChange={(e) => {
                handleInputChange(e, e.target.value, "label")
              }}
            />

            <label htmlFor="lname">Value</label>
            <input
              type="number"
              id="value"
              name="value"
              placeholder="Please Enter Value"
              value={defaultValue.value}
              onChange={(e) => {
                handleInputChange(e, Number(e.target.value), "value")
              }}
            />

            <input
              type="submit"
              value="Submit"
              onClick={() => {handleSubmit(defaultValue.id)}}
            />
          </div>
        </>
      </Modal>
    </>
  )
}

export default List
