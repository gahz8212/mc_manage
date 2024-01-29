import client from "./client";
export const addImage = (images: FormData) => {
  return client.post("/item/images", images);
};
export const removeImage = (info: { id: number; url: string }) => {
  return client.post(`/item/images/${info.id}`, info.url);
};
export const addItem = (item: {
  category: string;
  name: string;
  descript: string;
  price: number;
  point: number;
  images: { url: string }[];
}) => {
  return client.post("/item/addItem", item);
};
export const excelAddItem = (
  items:
    | {
        category: string;
        name: string;
        descript: string;
        unit: string;
        price: number;
        point: number;
        use: boolean;
        images: { url: string }[];
      }[]
    | null
) => {
  console.log(items);
  return client.post("/item/excelAdd", items);
};
export const getItems = () => {
  return client.get("/getItems");
};
export const editItem = (newItem: {
  [key: string]: "" | number | string | boolean | { url: string }[];
}) => {
  return client.post("/item/editItem", newItem);
};
export const removeItem = (id: number) => {
  return client.delete(`/item/remove/${id}`);
};
