export default function StoryTray({ stories }) {
  const extendedStories = [
    ...stories,
    { id: 'create', label: 'Create Story' }
  ];

  return (
    <ul>
      {extendedStories.map(story => (
        <li key={story.id}>
          {story.label}
        </li>
      ))}
    </ul>
  );
}