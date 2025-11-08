function deleteProduct(id) {
  const result = confirm("Do you wnat to delete this product ?");
  if (result) {
    fetch("/delete-product/" + id, {
      method: "POST",
    }).then((res) => {
      if (res.ok) {
        location.reload(); //refresh the table view
      }
    });
  }
}
