import React, {useEffect} from "react"

const Spinner = () => {
	/*########################*/    
    // HIDE THE SPINNER
    useEffect(()=>{
        const ele = document.getElementById('spinner')
        if(ele){
            ele.classList.add('hide')
            setTimeout(() => {ele.outerHTML = ''}, 100)
        }
    })
    return(
        <div id="spinner">
		<div className="preloader">
			<div className="wrapper-triangle">
				<div className="pen">
					<div className="line-triangle">
						<div className="triangle"></div>
						<div className="triangle"></div>
						<div className="triangle"></div>
						<div className="triangle"></div>
						<div className="triangle"></div>
						<div className="triangle"></div>
						<div className="triangle"></div>
					</div>
					<div className="line-triangle">
						<div className="triangle"></div>
						<div className="triangle"></div>
						<div className="triangle"></div>
						<div className="triangle"></div>
						<div className="triangle"></div>
						<div className="triangle"></div>
						<div className="triangle"></div>
					</div>
					<div className="line-triangle">
						<div className="triangle"></div>
						<div className="triangle"></div>
						<div className="triangle"></div>
						<div className="triangle"></div>
						<div className="triangle"></div>
						<div className="triangle"></div>
						<div className="triangle"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
    )
}
export default Spinner