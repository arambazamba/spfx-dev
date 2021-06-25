<template>
    <div>       
        <div class="flexcol">
          <label v-text="msgEnter"></label>
          <input type="text" placeholder="Type Skill & press Enter" v-model="adding" v-on:keyup.enter="addItem"/>
          <label>{{adding}}</label>
          <button v-on:click="addItem" >Add</button>
          </div>
          <p v-html="hr"></p>
        <label>Show Skills</label><input type="checkbox" v-model="showSkills" >
        <div v-if="showSkills">        
          <div>{{ title }} </div>
          <ul style="list-style: none;">
            <li v-for="item in skills" :key="item">
              <span v-on:click="removeItem(item)">{{ item }}</span>
            </li>
          </ul>
        </div>
        <div v-else>
          Skills are hidden
        </div>
        <div>
           <ul style="list-style: none;">
            <p>Total: {{ctLangs}}</p>
            <li v-for="item in certs" :key="item">
              <span v-on:click="removeItem(item)">{{ item }}</span>
            </li>
          </ul>
        </div>
    </div>  
</template>

<script>
export default {
  name: "skills",
  data() {
    return {
      msgEnter: "Enter Skill to add",
      title: "These are the skills:",
      hr: "<hr/>",
      showSkills: true,
      skills: ["Node.js", "TypeScript", "Angular", "Vue.js"],
      adding: ""
    };
  },
  props: {
    certs: Array
  },
  methods: {
    addItem: function() {
      this.skills.push(this.adding);
    },
    removeItem: function(item) {
      console.log("removing:", item);
      this.skills = this.skills.filter(i => i !== item);
    }
  },
  computed: {
    ctLangs: function() {
      return this.skills.length;
    }
  }
};
</script>

<style scoped>
.flexcol {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background-color: lavender;
  padding: 1rem;
  height: 10rem;
}
</style>

