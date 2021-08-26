import ModelSelect from "../components/ModelSelect";
import {fuelTypes, makes} from "../dataTypes";
import {toPrice} from "../lib/toPrice";

export default {
  name: "car",
  title: "Cars",
  type: "document",
  fields: [
    {
      name: "year",
      title: "Year",
      type: "number",
      validation: (Rule) =>
        Rule.required().min(0).max(new Date().getFullYear()),
    },
    {
      name: "make",
      title: "Make",
      type: "string",
      options: {
        list: [...makes],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "model",
      title: "Model",
      type: "string",
      inputComponent: ModelSelect,
      validation: (Rule) => Rule.required(),
    },
    {
      name: "fuelType",
      title: "Fuel Type",
      type: "string",
      options: {
        list: [...fuelTypes],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "miles",
      title: "Miles",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    },
    {
      name: "details",
      title: "Details",
      type: "text",
      rows: 6,
      initialValue:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.lorem",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "price",
      title: "Price (USD)",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      initialValue: new Date().toISOString(),
    },
  ],

  preview: {
    select: {
      make: "make",
      model: "model",
      year: "year",
      price: "price",
      media: "image",
    },
    prepare(selection) {
      const {make, model, year, price, media} = selection;
      return {
        title: `${year || "Year"} ${make || "Make"} ${model || "Model"}`,
        subtitle: price ? toPrice(price) : "Price",
        media,
      };
    },
  },
};
