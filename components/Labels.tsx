export default function Labels({ list }: { list: [string] }) {
  const labels = list.map(label => (label.replace(/-/, ' ')))

  return (
    <ul className="book-labels">
      {labels.map(label => (<li key={`label-${label}`}>{label}</li>))}
    </ul>
  )
}
