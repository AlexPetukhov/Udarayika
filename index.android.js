import React, { Component } from 'react';
import {  AppRegistry,  StyleSheet,   Text, View, Image,
  TouchableNaviteFeedback,   TouchableHighlight } from 'react-native';

class Button extends Component {
  render() {
    return (
      <TouchableHighlight onPress={() => this.props.onPress()} underlayColor='white' >
      <View style={ [styles.tryme, {backgroundColor: this.props.backColor}] } > 
        <Text style={{color:'#333', textAlign: 'center'}}>
           {this.props.messageToBePrinted}
        </Text>
      </View>
      </TouchableHighlight>
    )
  }
}

class EdgeChecker extends Component { 

  componentWillMount() {
    this.state = {
      isRevese: false,
      inResultsStage: false,
      lastSuccess: undefined,
      index: 0,
      streak:0,
      score: 0,
      total: 0,
      words: [
        ['ОБЕСПЕЧЕНИЕ', 'обеспЕчение', 'обеспечЕние'],
        ['ХОДАТАЙСТВО', 'ходАтайство', 'ходатАйство'],
        ['НАЧАЛИ', 'нАчали','началИ'],
        ['ВКЛЮЧИШЬ','включИшь','вклЮчишь'],
        ['МОЛЯЩИЙ','молЯщий','мОлящий'],
        ['БАНТЫ','бАнты','бантЫ'],
        ['ОБЛЕГЧИТЬ','облегчИть','облЕгчить'],
        ['БАЛУЯСЬ','балУясь','бАлуясь'],
        ['БУХГАЛТЕРОВ','бухгАлтеров','бухгалтерОв'],
        ['ПРИБЫЛ','прИбыл','прибЫл'],
        ['БАЛОВАННЫЙ','балОванный','бАлованный'],
        ['ФЕНОГТЯМЕН','фенОмен','феномЕн'],
        ['БАЛОВАТЬ','баловАть','бАловать'],
        ['СОГНУТЫЙ','сОгнутый','согнУтый'],
        ['ДОНЕЛЬЗЯ','донЕльзя','дОнельзя'],
        ['СВЕКЛА','свЕкла','свеклА'],
        ['КЛАЛА','клАла','клалА'],
        ['ЦЕПОЧКА','цепОчка','цЕпочка'],
        ['КОРЫСТЬ','корЫсть','кОрысть'],
        ['ТОРТЫ','тОрты','тортЫ'], 
        ['БАЛОВАТЬ','баловАть','бАловать'],
        ['ОПЛОМБИРОВАТЬ','опломбировАть','опломбИровать'],
        ['УГЛУБИТЬ','углубИть','углУбить'],
        ['КОРЫСТЬ','корЫсть','кОрысть'],
        ['КРЕМЕНЬ','кремЕнь','крЕмень'],
        ['ПОЗВОНИШЬ','позвонИшь','позвОнишь'],
        ['НАЧАВШИСЬ','начАвшись','начавшИсь'],
        ['ВЕРОИСПОВЕДАНИЕ','вероисповЕдание','вероисповедАние'],
        ['НАМЕРЕНИЕ','намЕрение','намерЕние'],
        ['НЕФТЕПРОВОД','нефтепровОд','нефтепрОвод'],
        ['КРАСИВЕЕ','красИвее','красивЕе'],
        ['ИСЧЕРПАТЬ','исчЕрпать','исчерпАть'],
        ['ФОРЗАЦ','фОрзац','форзАц'],
        ['ПРИНЯЛИ','прИняли','принЯли'],
        ['КРАЛАСЬ','крАлась','кралАсь'],
        ['ПЛОМБИРОВАТЬ','пломбировАть','пломбИровать'],
        ['ШАРФЫ','шАрфы','шарфЫ'],
        ['СРЕДСТВА','срЕдства','средствА',''],
        ['ПРОСВЕРЛИТ','просверлИт','просвЕрлит'],
        ['ДОГОВОР','договОр','дОговор'],
        ['ЩАВЕЛЬ','щавЕль','щАвель'],
        ['ФЛЁРДОРАНЖ','флёрдорАнж','флёрдОранж'],
        ['ОКРЕСТИТСЯ','окрЕстится','окрестИтся'],
        ['НОГТЯ','нОгтя','ногтЯ'],
        ['ШВАРТУЕТ','швартУет','швАртует',''],
        ['ЗАМУТНЕЕТ','замутнЕет','зАмутнеет'],
        ['ЦИКЛОТИМИЯ','циклотимИя','циклотИмия'],
        ['РАЗВЁРТКИ','развЁртки','рАзвертки'],
        ['ИЗВИНИШЬСЯ','извинИшься','извИнишься'],
        ['КЛУБОК','клубОк','клУбок'],
        ['СМИРИТЕЛЬ','смирИтель','смИритель'],
        ['ПРЕСВИТЕРСКИЙ','пресвИтерский','пресвитЕрский'],
        ['ТРЮКА','трЮка','трюкА'],
        // {
        //   word: 'ОБЕСПЕЧЕНИЕ',
        //   correct: 'обеспЕчение',
        //   wrong: 'обеспечЕние'
        // },  
        // {
        //   word: 'ХОДАТАЙСТВО',
        //   correct: 'ходАтайство',
        //   wrong: 'ходатАйство'
        // }
      ]
    }
  }

  render() {
    const {words, index} = this.state;
    const currentQuest = this.state.words[this.state.index];
    const question = `Как правильно пишется слово ${currentQuest[0]} ?`;  

    return ( 
      <View style={styles.fullblue}>
         <View style={{}}>
            <Text>{question}</Text>
         </View>

         {this.renderButtons(currentQuest)}

          <View>
            <Text> Ваш счет: {this.state.score} из {this.state.total}</Text>
          </View>
          <View>
            <Text>{this.state.streak} правильно раз подряд</Text>
          </View>

      </View>
    );
  }

  renderButtons(currentQuest) {
    const defaultColor = 'steelblue';
    const {lastSuccess, inResultsStage, isRevese} = this.state
    const successBackColor = inResultsStage ? (lastSuccess ? 'green' : defaultColor ) : defaultColor
    const failureBackColor = inResultsStage ? (!lastSuccess ? 'red' : defaultColor) : defaultColor

   return (
     <View style={{ flexDirection:  isRevese ? 'row-reverse' : 'row' }}>
        <Button onPress={() => this.success()} messageToBePrinted={currentQuest[1]}  backColor={successBackColor} />
        <Button onPress={() => this.failure()} messageToBePrinted={currentQuest[2]}  backColor={failureBackColor} />
      </View>
    )
  }

  success() {    
    this.setState({
      score: this.state.score + 1, 
      total: this.state.total + 1,
      streak: this.state.streak + 1,
      lastSuccess: true,
      inResultsStage: true
    })
    this.goNext()
  }

  failure() {
    this.setState({
      total: this.state.total + 1,
      streak: 0,
      lastSuccess: false,
      inResultsStage: true
    })
    
    this.goNext()
  }

  goNext() {
    let nextIndex = this.state.index;
    while (nextIndex === this.state.index) {
      nextIndex = Math.floor((Math.random() * this.state.words.length) );
    }

    setTimeout( 
      () => this.setState({index: nextIndex, isRevese: Math.random() >= .5, inResultsStage: false}), 
      100
    );
  }
}

const styles = StyleSheet.create({
  tryme:
  { 
   alignItems: 'center',
   margin:10,
   backgroundColor:'red',
   padding: 5
  },
  fullblue:{
    flexDirection: 'column', 
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  
  },
});

AppRegistry.registerComponent('mood', () => EdgeChecker);
