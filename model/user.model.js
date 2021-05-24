class User {
    constructor(firstName, lastName){
        this.template =  {
            "name": "template1",
            "color": "#c74a73",
            "background_color": "linear-gradient(to top, rgb(11, 163, 96) 0%, rgb(60, 186, 146) 100%)"
          };
          this.avatar =  "",
          this.about =  {
            "name": firstName+" "+lastName,
            "level": "Ph.D",
            "university": [],
            "address": "",
            "phone": "",
            "fax": "",
            "mail": [] 
          };
          this.research_interests =  [];
          this.academic =  [];
          this.news =  []; 
          this.teaching = {
            "academic_year": "",
            "graduate_course": [],
            "undergraduate_courses": []
          };
          this.thesis =  {
            "link": [],
            "content": []
          }; 
          this.research_grant =  [],
          this.publications =  {
            "book": [],
            "paper": []
          }
    }
}

module.exports = User;