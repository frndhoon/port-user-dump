import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

interface TerminalDragItem {
	id: number;
	index: number;
	portCode: string;
}

interface UseTerminalFilterDragProps {
	terminalId: number;
	index: number;
	portCode: string;
	moveTerminalFilter: (dragIndex: number, hoverIndex: number, portCode: string) => void;
}

export const useTerminalFilterDrag = ({ terminalId, index, portCode, moveTerminalFilter }: UseTerminalFilterDragProps) => {
	const ref = useRef<HTMLDivElement>(null);

	const [{ isDragging }, drag] = useDrag({
		type: 'terminal',
		item: { id: terminalId, index, portCode },
		collect: monitor => ({
			isDragging: monitor.isDragging(),
		}),
	});

	const [, drop] = useDrop<TerminalDragItem, void, void>({
		accept: 'terminal',
		hover: (item, monitor) => {
			if (!ref.current) {
				return;
			}

			const dragIndex = item.index;
			const hoverIndex = index;

			if (dragIndex === hoverIndex || item.portCode !== portCode) {
				return;
			}

			const hoverBoundingRect = ref.current.getBoundingClientRect();
			const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
			const clientOffset = monitor.getClientOffset();
			if (!clientOffset) {
				return;
			}

			const hoverClientY = clientOffset.y - hoverBoundingRect.top;

			if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
				return;
			}
			if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
				return;
			}

			moveTerminalFilter(dragIndex, hoverIndex, portCode);
			item.index = hoverIndex;
		},
	});

	drag(drop(ref));

	return { ref, isDragging };
};
