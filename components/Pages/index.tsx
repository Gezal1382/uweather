import Component, { PageEl } from '@/components/Libs/Component';
import Copy from '@/components/Libs/Copy';
import Router from 'next/router'
import Window from '@/components/Libs/Window';
import TextBox from '@/components/Libs/TextBox';
import Icon2Titles from '@/components/Libs/Icon2Titles';
import Icon3Titles from '@/components/Libs/Icon3Titles';


export default p => Component(p, Page);
const Page: PageEl = (props, state, refresh, getProps) => {

  let styles = global.styles
  let name = "🌥️Shiraz/Iran Weather📌"


  return (
    <div style={{ direction: "rtl", minHeight: "11vh", }}>
      <br-x />
      <Window title={name} style={{ minHeight: 300, width: "calc(70% - 20px)", marginRight: "150px", backgroundColor: "white" }}>
        <div style={{ width: "150px", height: "200px", backgroundColor: "ghostwhite", position: "absolute", marginRight: "445px", marginTop: "30px", boxShadow: "0 0 10px rgb(0,0,0,.5)" }}>

          <div style={{ float: "left", position: "absolute", fontSize: "60px", marginRight: "50px" }}>
            🌤
          </div>

          <div style={{ paddingRight: "30px", marginTop: "90px", position: "absolute", fontSize: "50px" }}>
            {(props.current_condition.temp_C)}°c

          </div>
          <div style={{marginRight:"70px",marginTop:"80px",color:"blu"}}>
            دما
          </div>
        </div>

        <div style={{ width: "150px", height: "200px", backgroundColor: "lightblue", position: "absolute", marginRight: "245px", marginTop: "30px", boxShadow: "0 0 10px rgb(0,0,0,.5)" }}>
          <div style={{ fontSize: "60px", marginRight: "30px" }}>
            ☔
          </div>
          <div style={{ paddingRight: "30px", marginTop: "10px", position: "absolute", fontSize: "50px" }}>
            {(props.current_condition.humidity)}Φ
            </div>
            <div style={{marginRight:"60px"}}>
            رطوبت
            </div>

          
        </div>

        <div style={{ width: "150px", height: "200px", backgroundColor: "ghostwhite", position: "absolute", marginRight: "45px", marginTop: "30px", boxShadow: "0 0 10px rgb(0,0,0,.5)" }}>
          <div style={{ fontSize: "60px", marginRight: "50px" }}>
            🌦
          </div>
          <div style={{ paddingRight: "30px", marginTop: "20px", position: "absolute", fontSize: "30px" }}>
            {(props.current_condition.precipMM)}mm
            </div>
            <div style={{marginRight:"40px",color:"blue"}}>
            میزان بارندگی</div>    


        </div>
      </Window>
    </div>
  )
}


export async function getServerSideProps(context) {


  var session = await global.SSRVerify(context)
  var { uid, name, image, imageprop, lang, cchar,
    unit, workspace, servid, servsecret,
    usedquota, quota, quotaunit, status, regdate, expid,
    role, path, devmod, userip, } = session;

  let json = await (await fetch("https://irmapserver.ir/research/api/weather/")).json()
  let current_condition = json.current_condition[0]
  

  return {
    props: {
      data: global.QSON.stringify({
        current_condition,
        session,
        // nlangs,
      })
    },
  }
}