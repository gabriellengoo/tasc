export default {
    name: 'home',
    title: 'Home Text Sections',
    type: 'document',
    fields: [
      {
        name: 'identifier',
        title: 'Identifier',
        type: 'string',
        description: 'A unique key to reference this section in your frontend.',
        validation: (Rule) => Rule.required(),
      },
      {
        name: 'content',
        title: 'Content',
        type: 'array',
        of: [{ type: 'block' }],
        description: 'Text content for this section.',
      },
      {
        name: 'textType',
        title: 'Text Type',
        type: 'string',
        options: {
          list: [
            { title: 'Heading 1', value: 'h1' },
            { title: 'Heading 2', value: 'h2' },
            { title: 'Paragraph', value: 'p' },
            { title: 'Button Text', value: 'button' },
            { title: 'Flashing Text', value: 'flashing' },
          ],
        },
      },
      {
        name: 'additionalInfo',
        title: 'Additional Information',
        type: 'boolean',
        description: 'Check if this section is part of the sliding info panel.',
      },
    ],
  };
  