import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

interface PortSectionDragItem {
	portCode: string;
	index: number;
}

interface UsePortSectionDragProps {
	portCode: string;
	sectionIndex: number;
	movePortSection: (dragIndex: number, hoverIndex: number) => void;
}

export const usePortSectionDrag = ({ portCode, sectionIndex, movePortSection }: UsePortSectionDragProps) => {
	const ref = useRef<HTMLDivElement>(null);

	const [, drag] = useDrag({
		type: 'port-section',
		item: { portCode, index: sectionIndex },
		collect: monitor => ({
			isDragging: monitor.isDragging(),
		}),
	});

	const [, drop] = useDrop<PortSectionDragItem, void, void>({
		accept: 'port-section',
		hover: (item, monitor) => {
			if (!ref.current) {
				return;
			}

			const dragIndex = item.index;
			const hoverIndex = sectionIndex;

			if (dragIndex === hoverIndex) {
				return;
			}

			const hoverBoundingRect = ref.current.getBoundingClientRect();
			const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
			const clientOffset = monitor.getClientOffset();
			if (!clientOffset) {
				return;
			}

			const hoverClientX = clientOffset.x - hoverBoundingRect.left;

			if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
				return;
			}
			if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
				return;
			}

			movePortSection(dragIndex, hoverIndex);
			item.index = hoverIndex;
		},
	});

	drag(drop(ref));

	return { ref };
};
