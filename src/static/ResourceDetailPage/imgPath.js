const baseURL =
  "https://hangang-storage.s3.ap-northeast-2.amazonaws.com/assets/img/ResourceDetailPage";

export const MorePath = baseURL + "/more.png";

export const notPushedThumb = baseURL + "/not_pushed.png";
export const pushedThumb = baseURL + "/pushed.png";
export const closeReportModalButton = baseURL + "/close_report_modal_button.png";

export const notPurchasedIconPath = (ext) => {
  return baseURL + "/extensions/" + `${ext.toUpperCase()}.png`;
};

export const purchasedIconPath = (ext) => {
  return baseURL + "/extensions" + "/purchased/" + `${ext.toUpperCase()}.png`;
};
