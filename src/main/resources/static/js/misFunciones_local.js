function traerInformacion(){
	$.ajax({    
    url : 'http://localhost/api/Custome/all',
    type : 'GET',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    success : function(respuesta) {
		console.log(respuesta);
		$("#resultado").empty();
        let miTabla = '<table>';
		for (i=0; i<respuesta.length; i++){
			miTabla += '<tr>';
	        miTabla += '<td>'+ respuesta[i].id+ '</td>'; 		
	        miTabla += '<td>'+ respuesta[i].brand+ '</td>'; 		
	        miTabla += '<td>'+ respuesta[i].name+ '</td>'; 		
	        miTabla += '<td>'+ respuesta[i].model+ '</td>'; 		
	        miTabla += '<td>'+ respuesta[i].category.id+ '</td>'; 		
            miTabla += '<td><button onclick="editarRegistro('+respuesta[i].id+' )">Editar</button>';			
            miTabla += '<td><button onclick="eliminarRegistro('+respuesta[i].id+' )">Borrar</button>';			
			miTabla += '</tr>';
	
		}
        miTabla += '</table>';
	    $("#resultado").append(miTabla);    
        pintarSelect(0);
	},
    error : function(xhr, status) {
        alert('ha sucedido un problema:'+ status);
    }
});
}

function guardarInformacion(){
    let selected = $("#cat").children(":selected").attr("value");
	
	if (selected.length > 0) {
		let misDatos = {
			brand: $("#brand").val(),
			id_cat: selected,
			id: $("#id").val(),
			model: $("#model").val(),
			name: $("#name").val(),
			category: {id: selected}
			
		};
		let datosJson = JSON.stringify(misDatos); 
		$.ajax(    
		'http://localhost/api/Custome/save',
		{data: datosJson,
		type : 'POST',
		dataType : 'json',
		contentType: "application/json; charset=utf-8",
	  
		statusCode : {
			201 :  function() {
				
				alert("guardado! ");
				$("#brand").val("");
				$("#category").val("");
				$("#id").val("");
				$("#model").val("");
				$("#name").val("");
				traerInformacion();	
				}
			}
		});
	}
	else
	{
		alert('Debe escoger categoria');
    }
}

function editarRegistro (id){
	$.ajax({    
    url : 'http://localhost/api/Custome/'+id,
    type : 'GET',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    success : function(respuesta) {
		console.log(respuesta+ "url" + "http://localhost/api/Custome/"+id);
        let miTabla = '<table>';
			$("#brand").val(respuesta.brand);
			$("#category").val(respuesta.id_cat);
			$("#id").val(respuesta.id);
			$("#model").val(respuesta.model);
			$("#name").val(respuesta.name);
            $("#id").attr("readonly", true);
			pintarSelect(respuesta.category.id);
	},
    error : function(xhr, status) {
        alert('ha sucedido un problema:'+ status);
    }
});
}

function actualizarInformacion(){
    let selected = $("#cat").children(":selected").attr("value");
	let misDatos = {
		brand: $("#brand").val(),
        category_id: selected,
        id: $("#id").val(),
        model: $("#model").val(),
        name: $("#name").val()
	};
	let datosJson = JSON.stringify(misDatos); 

	$.ajax(    
    'http://localhost/api/Custome/update',
	{data: datosJson,
    type : 'PUT',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    statusCode : {
		201 :  function() {
			alert("Actualizado!");
			$("#brand").val("");
			$("#category").val("");
			$("#id").val("");
			$("#model").val("");
			$("#name").val("");
			$("#id").attr("readonly", false);
        	traerInformacion();	
			}
		}
	});
}

function pintarSelect(idCat){
	$.ajax({    
    url : 'http://localhost/api/Category/all',
    type : 'GET',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    success : function(respuesta) {
		console.log(respuesta);
		$("#cat").empty();
		miSelect='<option id="" ></option>';
		for (i=0; i<respuesta.length; i++){
			if (respuesta[i].id == idCat){
     	        miSelect += '<option selected value='+ respuesta[i].id+ '>'+respuesta[i].name+'</option>'; 		
				
			}
			else {
				miSelect += '<option value='+ respuesta[i].id+ '>'+respuesta[i].name+'</option>'; 		
			}
		}
	    $("#cat").append(miSelect);    

	},
    error : function(xhr, status) {
        alert('ha sucedido un problema en la carga del select:'+ status);
    }
});
	
}	

function eliminarRegistro (id){
    alert("registro Eliminado No:"+id);

	$.ajax({    
    url : 'http://localhost/api/Custome/'+id,
    type : 'DELETE',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
        
    statusCode : {
		204 :  function() {
			alert("registro Eliminado No:"+id);
			traerInformacion();
			}
	},
    error : function(xhr, status) {
        alert('ha sucedido un problema:'+ status);
    }
});
}
	
	

/*
$.post('https://gc31840f0846900-grupo16ciclo3.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/api/costume',
    datosJson,
    function(data, textStatus, jqXHR)
    {
        alert("guardado!");
		$("#brand").val("");
        $("#category").val("");
        $("#id").val("");
        $("#model").val("");
        $("#name").val("");
        		
		traerInformacion();
        alert("guardado!");
       //data: Data from server.    
    }).fail(function(jqXHR, textStatus, errorThrown) 
    {
        alert('ha sucedido un problema:'+ textStatus +" resp:" + errorThrown );
 
    });
}
*/






