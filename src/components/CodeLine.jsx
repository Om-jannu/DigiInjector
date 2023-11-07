import PropTypes from 'prop-types';
import { useDrag, useDrop } from 'react-dnd';
import { RiDeleteBin6Line } from 'react-icons/ri';

const CodeLine = ({ content, index, moveCodeLine, deleteCodeLine }) => {
  const [{ isDragging }, drag, preview] = useDrag({
    type: 'CODE_LINE',
    item: { index },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'CODE_LINE',
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveCodeLine(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div
      ref={(node) => drop(preview(node))}
      className={`flex items-center mb-2 ${isDragging ? 'bg-gray-600' : 'bg-gray-800'} rounded-md p-2`}
      style={{
        opacity: isDragging ? 0.7 : 1,
        marginTop: isDragging ? '20px' : '0', // Add spacing during dragging
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
    >
      <button
        className="ml-2 bg-red-500 text-white py-1 px-2 rounded-md hover:bg-red-600 focus:outline-none"
        onClick={() => deleteCodeLine(index)}
      >
        <RiDeleteBin6Line />
      </button>
      <pre ref={drag}>{content}</pre>
    </div>
  );
};

CodeLine.propTypes = {
  content: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  moveCodeLine: PropTypes.func.isRequired,
  deleteCodeLine: PropTypes.func.isRequired,
};

export default CodeLine;


