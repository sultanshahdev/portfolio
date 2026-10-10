// These are layout samples for future author-written articles, not publications.
export const writing = [
  {
    slug: 'where-a-module-should-end', title: 'Where a module should end',
    category: 'Software Architecture', status: 'Sample draft', publishedAt: null,
    abstract: 'A short sample note on separating application coordination from storage operations, and making the boundary visible in code.',
    showTableOfContents: true,
    sections: [
      { id: 'responsibilities', title: 'Start with responsibilities', blocks: [
        { type: 'prose', text: 'A useful way to read a small application is to ask what each part knows. One module may know how to read a command, another how to query stored records, and another how to turn those records into a useful result.' },
        { type: 'prose', text: 'A boundary becomes clearer when a caller can ask for a result without also knowing the details of the storage operation. The example below illustrates that idea; it is not copied from a deployed system.' },
      ] },
      { id: 'example', title: 'An illustrative boundary', blocks: [
        { type: 'code', language: 'JavaScript', caption: 'Sample pseudocode · the repository supplies the storage behavior.', code: 'async function listActivities(repository, type) {\n  const activities = await repository.findByType(type);\n  return activities.map((activity) => ({\n    name: activity.name,\n    duration: activity.duration,\n  }));\n}' },
        { type: 'prose', text: 'The caller chooses a type and consumes the result. The repository decides how to retrieve it. That separation also creates a place to substitute a small in-memory implementation when checking the caller’s behavior.' },
      ] },
      { id: 'questions', title: 'Questions to keep open', blocks: [
        { type: 'list', items: ['Who validates input before the request reaches storage?', 'How does a failed query differ from a valid empty result?', 'Which part is responsible for releasing resources?'] },
        { type: 'callout', title: 'Draft to develop', text: 'TODO: replace this sample with Sultan’s own notes, a reviewed source example, and observations from testing the boundary.' },
      ] },
    ],
    references: [{ label: 'Activity Tracker repository', url: 'https://github.com/sultanshahdev/activity-tracker-web-js' }],
  },
  {
    slug: 'following-data-through-an-application', title: 'Following data through an application',
    category: 'Engineering Notes', status: 'Sample draft', publishedAt: null,
    abstract: 'A sample reading exercise: trace an input from its first boundary to its output, and note where its representation changes.',
    showTableOfContents: false,
    sections: [
      { id: 'trace', title: 'Follow one input', blocks: [
        { type: 'prose', text: 'Before drawing a complete architecture, try following one input. A date entered as text may become a date object, a query parameter, and finally a label in the interface. Every conversion creates an opportunity to make an assumption explicit.' },
        { type: 'diagram', nodes: ['Input', 'Validation', 'Transformation', 'Output'], caption: 'An illustrative reading guide, not a diagram of a particular repository.' },
      ] },
      { id: 'boundaries', title: 'Write down the boundaries', blocks: [
        { type: 'list', items: ['What representation arrives at this step?', 'Which assumptions are checked, and which are inherited?', 'What happens when the next operation fails?'] },
        { type: 'callout', title: 'Draft to develop', text: 'TODO: replace this sample with a trace through a real project, including actual inputs, outputs, and failure cases.' },
      ] },
    ],
    references: [],
  },
];
