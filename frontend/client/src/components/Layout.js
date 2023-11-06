import { Helmet } from 'react-helmet';
import Navbar from './Navbar';
;

const Layout = ({ title, content, children }) => (
	<>
		<Helmet>
			<title>{title}</title>
			<meta name='description' content={content} />
		</Helmet>
		<div>
		<Navbar/>
		</div>
		<div className='bg-gray-800'>{children}</div>
	</>
);

export default Layout;