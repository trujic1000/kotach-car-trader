export default {
  name: "faq",
  title: "FAQ",
  type: "document",
  fields: [
    {
      name: "question",
      title: "Question",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "answer",
      title: "Answer",
      type: "text",
      rows: 3,
      initialValue:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempo",
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: "question",
    },
  },
};
