import Button from '@material-ui/core/Button';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

export const actionCellRenderer = (
	assoc,
	item,
	itemId,
	textSelector,
	getItemById,
	viewOnly,
	selectionMode,
	textWhenEmpty,
	onRemove,
) => {
	const otherId = assoc[itemId];
	if(otherId){
		const otherItem = getItemById(otherId);
		const textToDisplay = textSelector(otherItem);
		return 	<div className="task-or-driver-name">
					<span>{textToDisplay}</span>
				 	{!viewOnly &&  !selectionMode && <HighlightOffIcon 
				 			className="remove-icon"
					 		onClick={(e) => {
					 		e.stopPropagation();
					 		onRemove(otherItem)  
			 			}}
				 		fontSize={'small'}/>
			 		}
			 	</div>;
	}
	if (viewOnly){
		return '-'
	}
	return <Button className="btn-add-task" color="primary">+ {textWhenEmpty}</Button>
}	