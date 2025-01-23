import '../styles/Task.css'
import Tags from './optional_components/Tags'

export default function Task() {
	return (
		<li className='task-item'>
			<img className='task-img' src="" alt="" />
			<p className='task-text'>Create a task manager and as best as possible so that it is clear</p>
			<Tags />
		</li>
	)
}