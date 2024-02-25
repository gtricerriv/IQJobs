  const CKEcom = function () {
  let e = !1,
  t = null,
  n = null,
  r = null,
  i = [];
  const o = {
  GetCSVLineSKU() {
  return this.lineitems_sku.join("^")
},
  GetCSVLineQty() {
  return this.lineitems_qty.join("^")
},
  GetCSVLinePrice() {
  return this.lineitems_prc.join("^")
},
  GetCSVLineDiscount() {
  return this.lineitems_dis.join("^")
},
  GetTParam() {
  return this.transaction_id ? `&t=${this.transaction_id}` : ""
},
  GetPParam() {
  let e = 0;
  return i.forEach((function (t) {
  e += eval(o[t.key] || 0) * t.operator
})), e > 0 ? `&p=${e}` : ""
}
};
  return GetOParam = function () {
  return n ? `&o=${n}` : ""
}, GetEParam = function () {
  return r ? `&e=${r}` : ""
}, GetRParam = function () {
  let e = GetCki("ckmsid");
  return e ? `&r=${e}` : ""
}, GetCki = function (e) {
  let t = e + "=",
  n = document.cookie.split(";");
  for (var r = 0; r < n.length; r++) {
  let e = n[r];
  for (;
  " " == e.charAt(0);) e = e.substring(1, e.length);
  if (0 == e.indexOf(t)) return e.substring(t.length, e.length)
}
  return null
}, FmtFrmSrc = function () {
  return `https://${t}/p.ashx?${GetOParam()+GetEParam()+o.GetPParam()+o.GetTParam()+GetRParam()}&ecsk=${o.GetCSVLineSKU()}&ecqu=${o.GetCSVLineQty()}&ecpr=${o.GetCSVLinePrice()}&ecld=${o.GetCSVLineDiscount()}&ecst=${o.order_sub_total}&ecd=${o.order_discount}&ectx=${o.order_tax}&ecsh=${o.order_shipping}&ect=${o.order_total}&ecv=${o.voucher}&ecc=${o.coupon}`
}, AddFrm = function () {
  let e = document.createElement("iframe");
  e.src = this.FmtFrmSrc(), e.width = 1, e.height = 1, e.style.border = 0, document.getElementsByTagName("body")[0].appendChild(e)
}, FireTrk = function () {
  if (document.getElementsByTagName("body").length > 0) AddFrm();
  else {
  var e = window.onload;
  window.onload = function () {
  AddFrm(), "function" == typeof e && e()
}
}
}, AssignAndFire = function (e, c, a, s, u) {
  t = e, n = c, r = a, i = s, Object.assign(o, u), FireTrk()
}, AssignAndFire
}();
