<template>
	<!-- <div class="diamond"></div> -->
	<div class="form-wrap">
		<h2 class="mob">Hotel Booking Form</h2>
		<h3 class="mob">Mobile Version</h3>
		<h5 class="mob">view on a desktop for the full experience</h5>
		<form action="">
			<div class="location">
				<label for="location">LOCATION</label><br/>
				<md-autocomplete @input="searchCity()" v-model="selectedCountryDeparture" :md-options="$store.getters.dataCitySearch" @md-changed="getCountriesDeparture" @md-selected="getSeletedItem()">
      <label>Departure</label>

      <template slot="md-autocomplete-item" slot-scope="{ item, term }"> {{item.name}}--{{item.id}} {{term}}</template>
    </md-autocomplete>
			</div>
			<div class="guests">
				<label for="guests">NUMBER OF GUESTS</label><br/><br/>
				<button class="counter-btn" type="button" id="cnt-down">-</button>
				<input type="text" id="guestNo" name="guests" value="2"/>
				<button class="counter-btn" type="button" id="cnt-up">+</button>
			</div>
			<div class="dates">
				<div class="arrival">
					<label for="arrival">ARRIVAL</label><br/>
					<md-datepicker v-model="selectedDateDeparture" />
				</div>
				<div class="departure">
					<label for="arrival">DEPARTURE</label><br/>
					<md-datepicker v-model="selectedDateArrival" /> 
				</div>
			</div>
		</form>
		<button @click="searchHotel" class="btn" type="button">BOOK NOW</button>
		<div class="linkbox">
			<div class="links">
				<div class="origin">
					<p>Check out Seth Coelen's original design over on dribbble</p><a href="https://dribbble.com/shots/2464177-Daily-UI-067-Hotel-Booking" target="_blank"><i class="fa fa-dribbble"></i></a>
				</div>
				<div class="me">
					<p>Why not take a look at my other pens while you're here</p><a href="https://codepen.io/lewisvrobinson"><i class="fa fa-codepen"></i></a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import router from '../router/index.js'
export default {
	name: 'Home',
	components: {
    // HelloWorld
},
data: () => ({
  toggleInfo:false,
  toggleInfo2:false,
  flightConfirmation :"",
  true:true,  
  vm:this,
  form: {
  firstName: "theo",
  lastName: "vast",
  isModalVisible: false,
  gender: null,
  age: null,
  email: "abc@gmail.com",},
  userSaved: false,
  sending: false,
  lastUser: null,
  menuVisible: false,
  selectedCountryDeparture: "",
  countries: [],
  selectedCountryArrival: null,
  localhost: "https://mighty-meadow-12799.herokuapp.com",
  info:{},
  info2:{},
  info3:{},
  selectedDateDeparture :"2020-02-01",
  selectedDateArrival : "2020-02-27",
  mojsOptions : {
            count : 6,
            radius: { 15: 100 },
            origin: '100% 100%',
            degree: 360,
            children: {
              shape: 'polygon',
              fill: ['blue','white'],
              isSwirl:true,
              swirlSize: 10,
              swirlFrequency: 2,
              delay: 'stagger(0, 30)'
            }
          },
          selectedTravel:{},
          searchObject:""
  }),

methods :{
	getSeletedItem(){
		this.selectedCountryDeparture = this.selectedCountryDeparture.iataCode
	},getCountriesDeparture (searchTerm) {
		this.countries = new Promise(resolve => {
			window.setTimeout(() => {
				if (!searchTerm) {
					resolve(this.countryList)
				} else {
					const term = searchTerm.toLowerCase()

					resolve(this.countryList.filter(({ name }) => name.toLowerCase().includes(term)))
				}
			}, 500)
		})
	},getCountriesDeparture2 (searchTerm2) {
		this.countries = new Promise(resolve => {
			window.setTimeout(() => {
				if (!searchTerm2) {
					resolve(this.countryList)
				} else {
					const term = searchTerm2.toLowerCase()

					resolve(this.countryList.filter(({ name }) => name.toLowerCase().includes(term)))
				}
			}, 500)
		})
	},searchCity() {
		// this.showLoader(true)
    // var vm =this;
    var urlSend= "keyword="+this.selectedCountryDeparture



    async function postUrlEncoded() {
  // Default options are marked with *

  const response = await fetch("https://arcane-everglades-06390.herokuapp.com/citySearch?", {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      // 'Content-Type': 'application/json'   
      'Content-Type': 'application/x-www-form-urlencoded',
  },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *client
    body: urlSend// body data type must match "Content-Type" header
});
   // this.isLoading = true
  return await response.json(); // parses JSON response into native JavaScript objects
}

postUrlEncoded().then((data) => {
	window.console.log(data)
	this.countryList=data.data;
	this.$store.commit('dataCitySearchMute', data.data)
	// this.showLoader(false)

});
},
searchHotel(){
	    var urlSend= "keyword="+this.selectedCountryDeparture
	   async function postHotel(urlsend) {
  // Default options are marked with *

  const response = await fetch("https://arcane-everglades-06390.herokuapp.com/hotel?keyword="+urlsend, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      // 'Content-Type': 'application/json'   
      'Content-Type': 'application/x-www-form-urlencoded',
  },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *client// body data type must match "Content-Type" header
    body: urlSend
});
   // this.isLoading = true
  return await response.json(); // parses JSON response into native JavaScript objects
}

window.console.log(this.selectedCountryDeparture)
try {
postHotel(this.selectedCountryDeparture).then((data) => {
	window.console.log(data)
	// searchHotel
	this.$store.commit('change', data)
	router.onError((error) => {
 const pattern = /Loading chunk (\d)+ failed/g;
 const isChunkLoadFailed = error.message.match(pattern);
 const targetPath = router.history.pending.fullPath;
 if (isChunkLoadFailed) {
 router.replace(targetPath);
 }
 });
	router.push('about')
	// this.showLoader(false)

});}
  catch(error) {
  alert(error);

     }
}
}
}
</script>

<style lang="scss">
@import url(https://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700);

$green: #8DFEE1;
$grey: #EBF3F5;
$orange: #FEA88D;
$color1: #888;


.mob {
	display: none;
	@media(max-width: 450px) {
		display: inline-block;
	}
}



input {
	padding: 15px 10px;
	border: none;
	margin-bottom: 20px;
	border-radius: 3px;
	box-shadow: 1px 3px 20px rgba(#111, .1);
	width: 100%;
	height: 45px;
	outline: $green;
}

input[type=date]::-webkit-inner-spin-button {
	-webkit-appearance: none;
	display: none;
}

#guestNo {
	width: 80px;
	margin: 0 20px;
	text-align: center;
}

input[type="date"] {
	&:webkit-inner-spin-button {
		display: none;
	} 
}

label {
	padding-bottom: 10px;
	display: inline;
	float: left;
}

.counter-btn {
	position: relative;
	display: inline-block;
	height: 40px;
	text-align: top;
	vertical-align: top;
	font-size: 1.5em;
	font-weight: 300;
	width: 40px;
	background: #fff;
	border: none;
	margin-bottom: 20px;
	border-radius: 50%;
	box-shadow: 1px 3px 20px rgba(#111, .1);
	cursor: pointer;
	outline: none;
	&:nth-child(2) {
		float: right;
	}
	&:hover {
		box-shadow: 1px 3px 20px rgba(#111, .3);
	}
}

.guests {
	margin: 10px;
}

.dates {
	.arrival {
		display: inline-block;
		float: left;
		width: 45%;
	}
	.departure {
		display: inline-block;
		float: right;
		width: 45%;
	}
}

.btn {
	border: none;
	padding: 10px;
	margin: 20px auto;
	width: 100%;
	height: 45px;
	display: block;
	background: $orange;
	color: #fff;
	font-size: 1.3em;
	letter-spacing: 0.1em;
	box-shadow: 1px 3px 20px rgba(#111, .1);
	border-radius: 3px;
	outline: none;
	&:hover {
		background: darken($orange, 5%);
	}
}

.windup {
	transform: translate(-50%, -50%) rotate(0deg);
	height: 100vh;
	width: 100vw;
	border-radius: 0;
}
.booked {
	background: darken($green, 30%);
	&:hover {
		background: darken($green, 20%);
	}
	&:before {
		content: '';
		position: absolute;
		bottom: 0;
		transform: translateY(-35px);
		left: -30px;
		display: block;
		height: 0px;
		border-radius: 3px;
		border: 20px solid darken($green, 30%);
		border-left: 30px solid rgba(0,0,0,0);
		border-right: 20px solid darken($green, 35%);
		z-index: -1;
		animation: ribbon-left .2s ease-in-out;
	}
	&:after {
		content: '';
		position: absolute;
		bottom: 0;
		transform: translateY(-35px);
		right: -30px;
		display: block;
		height: 0px;
		border-radius: 3px;
		border: 20px solid darken($green, 30%);
		border-right: 30px solid rgba(0,0,0,0);
		border-left: 20px solid darken($green, 35%);
		z-index: -1;
		animation: ribbon-right .2s ease-in-out;
	}
}

.linkbox {
	display: none;
}

.links {
	position: absolute;
	transform: translateY(100px);
	display: flex;
	justify-content: space-between;
	opacity: 1;
	animation: fadeIn 3s ease;
	background: darken($grey, 5%);
	@media(max-width: 450px) {
		transform: translateY(50px);
	}
	.origin, .me {
		display: flex;
		flex-flow: column;
		flex-grow: 1;
		padding: 10px 10px;
		color: $color1;
		border-radius: 5px;
		p {
			flex-grow: 1;
		}
		i {
			flex-grow: 1;
			font-size: 2em;
			color: $color1;
			&:hover {
				color: darken($color1, 20%);
			}
		}
	}
}

@keyframes ribbon-right {
	0% {
		transform: translate(-30px, -20px);
	}
}
@keyframes ribbon-left {
	0% {
		transform: translate(30px, -20px);
	}
}

@keyframes fadeIn {
	0% {
		opacity: 0;
	}
	80% {
		opacity: 1;
	}
}

</style>
