import logo from '../assets/logo.png';

export default function PublicHeader() {
	
  return (
    <header className='bg-white drop-shadow-lg fixed inset-x-0 top-0 w-full z-50 py-4 md:py-6'>
			<div className='auto_container'>
				<div className='flex justify-between items-center'>
					<span>
						<img style={{height: '50px', width:'50px'}} src={logo} alt="" />
					</span>
				</div>
			</div>
		</header>
  );
}
