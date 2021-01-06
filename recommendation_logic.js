/**
 * Function to calculation the Jensen-Shannon
 * divergence between two strings.
 * @param {*} sampleA The first string.
 * @param {*} sampleB The second string.
 */
function jensenShannonDivergenceCalculator(sampleA, sampleB){
    var preferenceMap = new Map()
    var descriptionMap = new Map()
    var allWords = []
  
    // Creates a frequency map for sampleA.
    sampleA.forEach(item => {
      if(preferenceMap.get(item) != null){
        preferenceMap.set(item, preferenceMap.get(item) + 1)
      }
      else {
        preferenceMap.set(item, 1)
      }
  
      allWords.push(item)
    })
  
    // Creates a frequency map for sampleB.
    sampleB.forEach(item => {
      if(descriptionMap.get(item) != null){
        descriptionMap.set(item, descriptionMap.get(item) + 1)
      }
      else {
        descriptionMap.set(item, 1)
      }
  
      allWords.push(item)
    })
  
    // Creates a set of unique words from both samples.
    var uniqueWordSet = [...new Set(allWords)]
  
    var JSD = 0
    var Pcount = preferenceMap.size
    var Qcount = descriptionMap.size
  
    var score = 0
    var p;
    var q;
    var m;
  
    var plogp_m
    var qlogq_m
  
    // Use the probability of occurence of the words
    // in the samples to calculate Jensen-Shannon 
    // divergence.
    allWords.forEach(item => {
      if(preferenceMap.get(item) != null){
        p = preferenceMap.get(item) / Pcount
      } else {
        p = 0
      }
  
      if(descriptionMap.get(item) != null){
        q = descriptionMap.get(item) / Qcount
      } else {
        q = 0
      }
  
      m = (p + q)/2
  
      if(p !== 0){
        plogp_m = p * (Math.log(p/m)/Math.log(2))
      } else {
        plogp_m = 0
      }
  
      if(q !== 0){
        qlogq_m = q * (Math.log(q/m)/Math.log(2))
      } else {
        qlogq_m = 0
      }
  
      score += plogp_m + qlogq_m
    })
  
    JSD = 50 * score
  
    return JSD
  }

  /**
   * Function to get the recommended item using 
   * Jensen-Shannon divergence.
   * @param {*} preference User's food preference.
   * @param {*} itemDescriptionMap Item descriptions from a restaurant's menu.
   */
  function getRecommendation(preference, itemDescriptionMap){    
    var itemScoreMap = new Map()
    var itemKeys = Array.from(itemDescriptionMap.keys());
    var preferenceArray = normalizeStringToArray(preference)

    itemKeys.forEach(itemId => {
        var descriptionArray = normalizeStringToArray(itemDescriptionMap.get(itemId))
	      var jsdScore = jensenShannonDivergenceCalculator(preferenceArray, descriptionArray)
        itemScoreMap.set(jsdScore, itemId)
    })
    
    console.log(itemScoreMap)
    var itemScoreMapKeys = Array.from(itemScoreMap.keys());
    itemScoreMapKeys = itemScoreMapKeys.sort(function(a, b){return a-b})
    console.log(itemScoreMapKeys)
  
    return itemScoreMap.get(itemScoreMapKeys[0])
  }

  /**
   * Function to normalize a string by
   * removing punctuations and converting into
   * lowercase.
   * @param {*} stringInput 
   */
  function normalizeStringToArray(stringInput){
      return stringInput
      .replace(/[^\w\s]|_/g, "")
      .replace(/\s+/g, " ")
      .toLowerCase()
      .split(" "); 
  }
  
 module.exports = {getRecommendation};
