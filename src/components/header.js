import logo1 from "../assets/Test-Computer-Key.jpg";
import logo2 from "../assets/File-Format-Png-Image.png";

const Header=()=>{
    return(
        <div style={{backgroundColor:"green"}}>
       <img src={logo1} width={600} height={400} alt="test key image" />
       <img src={logo2} width={600} height={400} alt="file format image" />
       <img 
         src="https://t3.ftcdn.net/jpg/15/27/19/54/360_F_1527195470_5VccNbDHBse0xsYkgXs4wrztQoElWdBE.jpg"
         width={1200} height={600} alt="gold" />
        </div>
        
    )
}




export default Header