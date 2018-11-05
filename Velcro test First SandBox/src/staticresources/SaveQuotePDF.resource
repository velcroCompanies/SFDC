function SaveQuotePDF( QuoteId, QuoteLang, QuoteOption) {
    var res='#';
    try {
        var res= sforce.apex.execute("AttachmentGenerator","AttachPDFToQuote",{Id : QuoteId, Lang:QuoteLang, Option: QuoteOption  });
               
        
        if(res=='SUCCESS')
        {
		window.location.reload(); 
		}
        
        if (res.indexOf('Error')>0) 
        {
			alert('Error in attaching file ----'+ res);
		}
		if (QuoteOption=='1')
		{
			window.location.href = res; 
		}
		
    } catch(exception) {
        alert('Quote script error');
        window.location.href = res;
    }
}