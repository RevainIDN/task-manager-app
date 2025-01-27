import '../Tag/Tag.css'
import { TagInfo } from '../../types';

interface TagProps {
	tagInfo: TagInfo;
}

export default function Tag({ tagInfo }: TagProps) {
	if (!tagInfo) {
		return null;
	}

	return (
		<li className={`task-tag dropdown-item-tags--${tagInfo.color}`}>{tagInfo.tag}</li>
	);
}