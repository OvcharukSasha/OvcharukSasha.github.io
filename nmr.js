
  var objSel;
  var startingRegisters;
  var instructions;
  var registers;
  var currentLine;
  var nextLine;
  var flagEnd;
  var counter;

  // Ініціалізація вказівника на програму МНР
  function Initialization()
  {
    objSel = document.getElementById("Program");
  }

  // Додавання елемента в список
  function addOption (oListbox, text, value, isDefaultSelected, isSelected)
  {
    var oOption = document.createElement("option");
    oOption.appendChild(document.createTextNode(text));
    oOption.setAttribute("value", value);
    if (isDefaultSelected) oOption.defaultSelected = true;
    else if (isSelected) oOption.selected = true;
    oListbox.appendChild(oOption);
    oListbox.size++;
  }

  // Нумерування команд програми МНР
  function RefreshSelect()
  {
    var j=objSel.selectedIndex;
    for (var i=0;i<objSel.options.length;i++)
    {
      objSel.options[i].text=i+1+". "+objSel.options[i].value;
    }
  }

  // Додавання команди над поточною командою в програму МНР
  function AddAbove() 
  { 
    if ((objSel.selectedIndex==-1)&&(objSel.options.length>0)) 
    {
      alert("Не вибрана поточна команда!");
      return;
    };
    var Command="";
    switch (document.getElementById('InstructionType').selectedIndex) {
      case 0:
        Command="Z("+document.getElementById('ValueN').value+")";
        break;
      case 1:
        Command="S("+document.getElementById('ValueN').value+")";
        break;
      case 2:
        Command="T("+document.getElementById('ValueN').value+","+document.getElementById('ValueM').value+")";
        break;
      case 3:
        Command="J("+document.getElementById('ValueN').value+","+document.getElementById('ValueM').value+","+document.getElementById('ValueQ').value+")";
        break;
    }
    if (objSel.selectedIndex==-1) 
    {
      addOption(objSel, Command, Command, false, true);
    }
    else 
    {
      var j=objSel.selectedIndex;
      addOption(objSel, Command, Command, false, true);
      var oOption = objSel.options[j];
      var oNextOption = objSel.options[objSel.options.length-1];
      objSel.insertBefore(oNextOption, oOption);
    };
    RefreshSelect();
    document.getElementById('ResultsArea').innerHTML="";
  }

  // Додавання команди під поточною командою в програму МНР
  function AddBelow() 
  {
    if ((objSel.selectedIndex==-1)&&(objSel.options.length>0)) 
    {
      alert("Не вибрана поточна команда!");
      return;
    };
    var Command="";
    switch (document.getElementById('InstructionType').selectedIndex) {
      case 0:
        Command="Z("+document.getElementById('ValueN').value+")";
        break;
      case 1:
        Command="S("+document.getElementById('ValueN').value+")";
        break;
      case 2:
        Command="T("+document.getElementById('ValueN').value+","+document.getElementById('ValueM').value+")";
        break;
      case 3:
        Command="J("+document.getElementById('ValueN').value+","+document.getElementById('ValueM').value+","+document.getElementById('ValueQ').value+")";
        break;
    }
    if (objSel.selectedIndex==-1) 
    {
      addOption(objSel, Command, Command, false, true);
    }
    else 
    {
      var j=objSel.selectedIndex;
      addOption(objSel, Command, Command, false, true);
      var oOption = objSel.options[j+1];
      var oNextOption = objSel.options[objSel.options.length-1];
      objSel.insertBefore(oNextOption, oOption);
    };
    RefreshSelect();
    document.getElementById('ResultsArea').innerHTML="";
  }

  // Заміна поточної команди в програмі МНР
  function ChangeCurrentCommand() 
  {
    if (objSel.selectedIndex!=-1) 
    {
      var Command="";
      switch (document.getElementById('InstructionType').selectedIndex) {
        case 0:
          Command="Z("+document.getElementById('ValueN').value+")";
          break;
        case 1:
          Command="S("+document.getElementById('ValueN').value+")";
          break;
        case 2:
          Command="T("+document.getElementById('ValueN').value+","+document.getElementById('ValueM').value+")";
          break;
        case 3:
          Command="J("+document.getElementById('ValueN').value+","+document.getElementById('ValueM').value+","+document.getElementById('ValueQ').value+")";
          break;
      }
      var j=objSel.selectedIndex;
      objSel.options[objSel.selectedIndex] = new Option(Command, Command);
      objSel.options[j].selected=true;
      RefreshSelect();
    } else alert("Не вибрана поточна команда!");
  }

  // Видалення поточної команди в програмі МНР
  function RemoveCurrentCommand() 
  {
    if (objSel.selectedIndex!=-1) 
    {
      var j=objSel.selectedIndex;
      objSel.options[objSel.selectedIndex] = null;
      if (j<objSel.options.length) objSel.options[j].selected=true;
      else if (objSel.options.length>0) objSel.options[j-1].selected=true;
      RefreshSelect();
      objSel.size--;
    } else alert("Не вибрана поточна команда!");
  }

  // Показати текст коду програми МНР
  function ShowProgram() 
  {
    var tmp='<div style="font: normal 10pt Verdana;">';
    for (var i=0;i<objSel.options.length;i++)
    {
      tmp+=objSel.options[i].text+"<br>";
    }
    tmp+='</div>';
    v=window.open('','v');
    v.document.write(tmp);
    v.document.close();
  }

  // Встановлення допустимих аргументів для обраного типу команди
  function SetInstructionParameters() 
  {
    switch (document.getElementById('InstructionType').selectedIndex) {
      case 0:
        document.getElementById('ValueM').disabled=true;
        document.getElementById('ValueQ').disabled=true;
        break;
      case 1:
        document.getElementById('ValueM').disabled=true;
        document.getElementById('ValueQ').disabled=true;
        break;
      case 2:
        document.getElementById('ValueM').disabled=false;
        document.getElementById('ValueQ').disabled=true;
        break;
      case 3:
        document.getElementById('ValueM').disabled=false;
        document.getElementById('ValueQ').disabled=false;
        break;
    }
  }

  // Очистка всіх регістрів
  function ClearRegisters() 
  {
    for(var i=1;i<=10;i++) { document.getElementById('R'+i).value='0'; }
    document.getElementById('ResultsArea').innerHTML="";
    document.getElementById('TableCodeArea').style.visibility='hidden';
    document.getElementById('clicker').checked=false;
  }

  // Показування/приховування області для вводу готової програми МНР
  function ShowHideArea() 
  {
    var area=document.getElementById('TableCodeArea');
    document.getElementById('CodeArea').value="";
    if (area.style.visibility=='hidden') 
    { 
      area.style.visibility='visible';
      document.getElementById('AddAboveButton').disabled=true;
      document.getElementById('AddBelowButton').disabled=true;
      document.getElementById('ChangeCurrentButton').disabled=true;
      document.getElementById('RemoveCurrentButton').disabled=true;
    } 
    else 
    { 
      area.style.visibility='hidden';
      document.getElementById('AddAboveButton').disabled=false;
      document.getElementById('AddBelowButton').disabled=false;
      document.getElementById('ChangeCurrentButton').disabled=false;
      document.getElementById('RemoveCurrentButton').disabled=false;
    }
  }

  // Зчитування коду готової програми МНР
  function ReadCode() 
  {
    lines=document.getElementById('CodeArea').value.split('\n');
    objSel.options.length=0;
    objSel.size=2;
    for(var i=0;i<lines.length;i++) 
    {
      if (lines[i].trim().length > 0) 
      {
        var tmp=lines[i].trim();
        if (tmp.indexOf('Z') !=-1) tmp=tmp.substring(tmp.indexOf('Z'),tmp.length);
        if (tmp.indexOf('S') !=-1) tmp=tmp.substring(tmp.indexOf('S'),tmp.length);
        if (tmp.indexOf('T') !=-1) tmp=tmp.substring(tmp.indexOf('T'),tmp.length);
        if (tmp.indexOf('J') !=-1) tmp=tmp.substring(tmp.indexOf('J'),tmp.length);
        tmp=tmp.replace(/ /g,"");
        addOption(objSel, tmp, tmp, false, true);
      }
    }
    RefreshSelect();
    document.getElementById('clicker').click();
    document.getElementById('ResultsArea').innerHTML="";
    ClearRegisters();
    document.getElementById('makeStepButton').disabled=true;
    document.getElementById('runProgramButton').disabled=true;
    document.getElementById('loadProgramButton').disabled=false;
    document.getElementById('ClearRegistersButton').disabled =false;
    document.getElementById('AddAboveButton').disabled=false;
    document.getElementById('AddBelowButton').disabled=false;
    document.getElementById('ChangeCurrentButton').disabled=false;
    document.getElementById('RemoveCurrentButton').disabled=false;
  }

  // Очистка програми МНР
  function ClearProgram() 
  {
    objSel.disabled=false;
    objSel.options.length=0;
    objSel.size=2;
    document.getElementById('ResultsArea').innerHTML="";
    ClearRegisters();
    document.getElementById('makeStepButton').disabled=true;
    document.getElementById('runProgramButton').disabled=true;
    document.getElementById('loadProgramButton').disabled=false;
    document.getElementById('ClearRegistersButton').disabled =false;
    document.getElementById('AddAboveButton').disabled=false;
    document.getElementById('AddBelowButton').disabled=false;
    document.getElementById('ChangeCurrentButton').disabled=false;
    document.getElementById('RemoveCurrentButton').disabled=false;
    document.getElementById('TableCodeArea').style.visibility='hidden';
    document.getElementById('clicker').checked=false;
    document.getElementById('clicker').disabled=false;
    for(var i=0;i<10;i++) { document.getElementById('R'+eval(i+1)).disabled=false; };
  }

  // Обробка зміни значення регістру
  function ChangeRegister() 
  {
    document.getElementById('ResultsArea').innerHTML='';
    document.getElementById('TableCodeArea').style.visibility='hidden';
    document.getElementById('clicker').checked=false;
  }

  // Завантаження програми МНР для виконання
  function loadProgram() 
  {
    document.getElementById('ClearRegistersButton').disabled=true;
    document.getElementById('AddAboveButton').disabled=true;
    document.getElementById('AddBelowButton').disabled=true;
    document.getElementById('ChangeCurrentButton').disabled=true;
    document.getElementById('RemoveCurrentButton').disabled=true;
    document.getElementById('TableCodeArea').style.visibility='hidden';
    document.getElementById('clicker').checked=false;
    document.getElementById('clicker').disabled=true;
    objSel.disabled=true;
    document.getElementById('ResultsArea').innerHTML="";
    for(var i=0;i<10;i++) { document.getElementById('R'+eval(i+1)).disabled=true; };
    flagEnd=false;
    startingRegisters = new Array(0);
    for(var i=0;i<10;i++) { startingRegisters[i]=document.getElementById('R'+eval(i+1)).value; };
    instructions = new Array(0);
    for(var i=0;i<objSel.options.length;i++) { instructions[i]=objSel.options[i].value; };
    registers = startingRegisters.slice();
    currentLine = 1;
    counter=0;
    showCurrentCommand();
    var tmp="";
    tmp="<table cellpadding='5' style='border:1px solid gray;margin:3px;border-collapse:collapse;'><tr align='center' style='background-color:#d2f7f6;'>";
    tmp+="<td rowspan='2' style='min-width:140px;font-weight:bold;background-color:#62c9c7;'>Стартова<br>конфігурація:</td>";
    for(var i=0;i<10;i++) { tmp+="<td style='min-width:25px;'>R"+eval(i+1)+"</td>"; };
    tmp+="</tr><tr align='center'>";
    for(var i=0;i<10;i++) { tmp+="<td>"+startingRegisters[i]+"</td>"; };
    tmp+="</tr></table>";
    document.getElementById('ResultsArea').innerHTML+=tmp;
    document.getElementById('ResultsArea').scrollTop = 9999;
    document.getElementById('makeStepButton').disabled=false;
    document.getElementById('runProgramButton').disabled=false;
    document.getElementById('loadProgramButton').disabled=true;
  }

  // Виконання поточної команди програми МНР
  function makeStep() 
  {
    if (currentLine > instructions.length) 
    {
      if (!flagEnd) 
      {
        var tmp="";
        tmp="<table cellpadding='5' style='border:1px solid gray;margin:3px;border-collapse:collapse;'><tr align='center' style='background-color:#d2f7f6;'>";
        tmp+="<td rowspan='2' style='min-width:140px;font-weight:bold;background-color:#62c9c7;'>Кінцева<br>конфігурація:</td>";
        for(var i=0;i<10;i++) { tmp+="<td style='min-width:25px;'>R"+eval(i+1)+"</td>"; };
        tmp+="</tr><tr align='center'>";
        for(var i=0;i<10;i++) { tmp+="<td>"+registers[i]+"</td>"; };
        tmp+="</tr></table>";
        tmp+="<br>Виконано команд: "+counter+"<br>";
        tmp+="<br>Результат виконання програми: <span style='color:blue;'>R1="+registers[0]+"</span><br><br>";
        document.getElementById('ResultsArea').innerHTML+=tmp;
        document.getElementById('ResultsArea').scrollTop = 9999;
        flagEnd=true;
        document.getElementById('ClearRegistersButton').disabled=false;
        document.getElementById('AddAboveButton').disabled=false;
        document.getElementById('AddBelowButton').disabled=false;
        document.getElementById('ChangeCurrentButton').disabled=false;
        document.getElementById('RemoveCurrentButton').disabled=false;
        document.getElementById('makeStepButton').disabled=true;
        document.getElementById('runProgramButton').disabled=true;
        document.getElementById('loadProgramButton').disabled=false;
        document.getElementById('clicker').disabled=false;
        objSel.disabled=false;
        for(var i=0;i<10;i++) { document.getElementById('R'+eval(i+1)).disabled=false; };
      }
      return;
    }
    nextLine = currentLine + 1;
    try 
    {
      instruction = instructions[currentLine - 1];
      // console.log(currentLine + '. ' + instruction);
      type = instruction.split('(')[0];
      args = instruction.split('(')[1].split(')')[0].split(',');
      switch (type) {
        case 'Z':
          registers[args[0] - 1] = 0;
          break;
        case 'S':
          registers[args[0] - 1]++;
          break;
        case 'T':
          registers[args[1] - 1] = registers[args[0] - 1];
          break;
        case 'J':
          if (registers[args[0] - 1] == registers[args[1] - 1]) 
          {
            nextLine = parseInt(args[2]);
            console.log('Jumping to line ' + nextLine);
          }
          break;
      }
    } catch (err) { }
    displayRegisters();
    var tmp="";
    tmp="<table cellpadding='5' style='border:1px solid gray;margin:3px;border-collapse:collapse;'><tr align='center' style='background-color:#e8f2f1;'>";
    tmp+="<td rowspan='2' style='min-width:140px;font-weight:bold;background-color:#d2f7f6;'>"+objSel.options[currentLine-1].text+":</td>";
    for(var i=0;i<10;i++) { tmp+="<td style='min-width:25px;'>R"+eval(i+1)+"</td>"; };
    tmp+="</tr><tr align='center'>";
    for(var i=0;i<10;i++) { tmp+="<td>"+registers[i]+"</td>"; };
    tmp+="</tr></table>";
    document.getElementById('ResultsArea').innerHTML+=tmp;
    document.getElementById('ResultsArea').scrollTop = 9999;
    currentLine = nextLine;
    showCurrentCommand();
    counter++;
  }

  // Виконання програми МНР (від поточної команди до кінця)
  function runProgram() 
  {
    while (currentLine <= instructions.length) { makeStep(); }
    makeStep();
  }

  // Вивід поточних значень регістрів
  function displayRegisters() 
  {

   for (var i = 0; i < registers.length; i++) 
    {
      document.getElementById('R'+eval(i+1)).value=registers[i];
    }
  }

  // Виділення поточної команди в програмі МНР
  function showCurrentCommand() 
  {
    objSel.selectedIndex=currentLine - 1;
  }
