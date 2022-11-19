import Accordion from './Accordion';
const MessageAccordian = () => {
    const accordionData = [
        {
            message: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis sapiente
            laborum cupiditate possimus labore, hic temporibus velit dicta earum
            suscipit commodi eum enim atque at? Et perspiciatis dolore iure
            voluptatem.`,
            timestamp:Date.now(),
            location:'cords'
        },
        {
            message: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis sapiente
            laborum cupiditate possimus labore, hic temporibus velit dicta earum
            suscipit commodi eum enim atque at? Et perspiciatis dolore iure
            voluptatem.`,
            timestamp:Date.now(),
            location:'cords'
        },
        {
            message: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis sapiente
            laborum cupiditate possimus labore, hic temporibus velit dicta earum
            suscipit commodi eum enim atque at? Et perspiciatis dolore iure
            voluptatem.`,
            timestamp:Date.now(),
            location:'cords'
        },
        {
            message: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis sapiente
            laborum cupiditate possimus labore, hic temporibus velit dicta earum
            suscipit commodi eum enim atque at? Et perspiciatis dolore iure
            voluptatem.`,
            timestamp:Date.now(),
            location:'cords'
        }

        ];

  return (
    <div>
      <h1>Messages</h1>
      <div className="accordion overflow-auto">
        {accordionData.map(({ message, timestamp,location }) => (
          <Accordion message={message} timestamp={timestamp} location={location}/>
        ))}
      </div>
    </div>
  );
};

export default MessageAccordian;
