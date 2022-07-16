import instance from "./base.service";
export default (function (http) {
  const getBills = function () {
    return http.get("/bills");
  };

  const addBill = function (payload) {
    return http.post("/addBill", payload);
  };

  const updateBill = function (payload) {
    return http.put(`/${payload._id}/edit`, payload);
  };

  const deleteBill = function (payload) {
    return http.delete(`/delete/${payload._id}`);
  };
  const getBillDetail = function (id) {
    return http.get(`/bill/${id}`);
  };
  return {
    getBills,
    addBill,
    deleteBill,
    updateBill,
    getBillDetail,
  };
})(instance);
