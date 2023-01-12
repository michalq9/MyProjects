
function attachTripletEvent() {
    
  $('.col.triplet.value').click(function(event){
      $('#aainfo .aainfo input').val($(event.target).text()).trigger('change')
    });
}

  $('#calculatemRna').click(function(){
    
    AminoAcidTriplet = ['AAA','Lys','AAC','Asn','AAG','Lys','AAT','Asn','ACA','Thr','ACC','Thr','ACG','Thr','ACT','Thr','AGA','Arg','AGC','Ser','AGG','Arg','AGT','Ser','ATA','Ile','ATC','Ile','ATG','Met','ATT','Ile','CAA','Gln','CAC','His','CAG','Gln','CAT','His','CCA','Pro','CCC','Pro','CCG','Pro','CCT','Pro','CGA','Arg','CGC','Arg','CGG','Arg','CGT','Arg','CTA','Leu','CTC','Leu','CTG','Leu','CTT','Leu','GAA','Glu','GAC','Asp','GAG','Glu','GAT','Asp','GCA','Ala','GCC','Ala','GCG','Ala','GCT','Ala','GGA','Gly','GGC','Gly','GGG','Gly','GGT','Gly','GTA','Val','GTC','Val','GTG','Val','GTT','Val','TAA','Stp','TAC','Tyr','TAG','Stp','TAT','Tyr','TCA','Ser','TCC','Ser','TCG','Ser','TCT','Ser','TGA','Stp','TGC','Cys','TGG','Trp','TGT','Cys','TTA','Leu','TTC','Phe','TTG','Leu','TTT','Phe'];
    const DNA = $("#dnafield").val();
    DNAMut = $("#dnafieldMutation").val().toUpperCase();
    const Swap = {'T':'A','A':'T','G':'C','C':'G', ' ': '', '  ':''};
    const Swap2 = {'T':'U'};
    const Swap3 = {'T':'U', ' ': '', '  ':''};
    
    mRNA = DNA.toUpperCase().replace(/[TAGC   ]/g, m => Swap[m]);
    mRNA1 = mRNA.replace(/T/g, 'U');
      
    let DNAMutChange = DNAMut.replace(/[   ]/g, n => Swap3[n]);
    DNAMutChange = DNAMutChange.replace(/U/g, 'T');
    x1 = 0;
    x2 = 3;
    x3 = 0;
    x4 = 3;
    var aminoAcid = '';
    var aminoAcidMut = '';
    Triplet = [30];
    TripletMut = [30];
    for (i = 0; mRNA.length >= i; i++)
    {
        Triplet[i] = mRNA.substring(x1, x2);
        x1+=3;
        x2+=3;
    }
    for (i = 0; mRNA.length >= i; i++)
    {
        aminoS = (AminoAcidTriplet.findIndex((x) => x === Triplet[i]));
        if(aminoS>=0)
        {
            aminoAcid = aminoAcid + AminoAcidTriplet[aminoS+1];
        }
    }
      for (i = 0; DNAMutChange.length >= i; i++)
    {
        TripletMut[i] = DNAMutChange.substring(x3, x4);
        x3+=3;
        x4+=3;
        
    }
    for (i = 0; DNAMutChange.length >= i; i++)
    {
        aminoSe = (AminoAcidTriplet.findIndex((x) => x === TripletMut[i]));
        if(aminoSe>=0)
        {
            aminoAcidMut = aminoAcidMut + AminoAcidTriplet[aminoSe+1];
        }
    }
      
      
    
    let mrnaControl = $('#mrna');
    mrnaControl.text(mRNA1);
    mrnaControl.show();
    let mrnaMutControl = $('#mrnaMut');
    mrnaMutControl.text(DNAMut); 
    mrnaMutControl.show();

    let aminoAcidControl = $('#aminoAcid');
    aminoAcidControl.text(aminoAcid); 
    aminoAcidControl.show();
      
     let mutation = '';
    let insert = 'Insertion; ';
    let delition = 'Delition; ';
    let stummeMutation = 'stumme Mutation ';
    let missenseMutation = 'Missense Mutation; '
    let nonsenseMutation = 'NonsenseMutation; ';
    
    
    if(mRNA1.length > DNAMutChange.length)
    {
    mutation = mutation + delition;
    }
    if(mRNA1.length < DNAMutChange.length)
    {
    mutation = mutation + insert;

    }
    
    console.log(mRNA + ' ' + mRNA.length);

    let mrnaArrayLength = Math.floor(mRNA.length/3);
    let mrnaMutArrayLength = Math.floor(DNAMutChange.length/3);
    console.log(mrnaArrayLength);
    //alert(DNAMut);
    let lengChange = 0;
    if (mrnaArrayLength > mrnaMutArrayLength)
    {
    lengChange = lengChange + mrnaArrayLength;
    }
    if (mrnaArrayLength < mrnaMutArrayLength)
    {
      lengChange = lengChange + mrnaMutArrayLength;
    }
    if (mrnaArrayLength == mrnaMutArrayLength)
    {
    lengChange = lengChange + mrnaArrayLength;
    }
    let f1 = true;
    let f2 = true;
    
    $('#tripletContainer').empty();
    for (i = 0; i < lengChange; i++)
    {
    let row = '<div class="row"><div class="col">Triplet-{{id}}</div><div class="col triplet value" style="cursor: pointer">{{Value}}</div><div class="col">Protein: {{Value}}</div><div class="col">TripletMut: {{Value}}</div><div class="col">MutAmino: {{Value}}</div> </div>';  
      let tripletI = mRNA.substring(i*3, (i*3)+3);
      let tripletMutI = DNAMutChange.substring(i*3, (i*3)+3);
      let aminoI = aminoAcid.substring(i*3, (i*3)+3);
      let aminoMutI = aminoAcidMut.substring(i*3, (i*3)+3); 
      
      row = row.replace('{{id}}', i+1);
      row = row.replace('{{Value}}', tripletI);
      row = row.replace('{{Value}}',aminoI); //aminoI
      row = row.replace('{{Value}}',tripletMutI);
      row = row.replace('{{Value}}',aminoMutI);
      $('#tripletContainer').append(row);
      
      if(aminoI === aminoMutI && tripletI !== tripletMutI)
      {
      if(f2 == true)
      {
      mutation = mutation + stummeMutation;
        f2 = false;
      }
      }
      else if(aminoI !== aminoMutI && aminoI !== 'Stp' && aminoMutI !== 'Stp')
      {
      if(f1 == true)
      {
        mutation = mutation + missenseMutation;
        f1 = false;
      }
      }
      if(aminoMutI === 'Stp' && aminoI === 'Stp')
      {
      mutation = mutation;
      }
      else if (aminoMutI === 'Stp')
      {
        mutation = mutation + nonsenseMutation;
      }
    }
    
    attachTripletEvent();    
    let MutControl = $('#mutations');
    MutControl.text(mutation); 
    MutControl.show();
  });


