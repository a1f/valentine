var RAW_GITHUB_PREFIX = 'https://raw.githubusercontent.com/alexfetisov/valentine/master/img';

function Heart(index) {
  if (index != undefined) {
    this.index = index;
  }
  this.$heart = $('<div onclick=\'HideHeart(' + index + ')\' />');
  this.show = false;
  this.$heart.css({
    'display': 'none',
    'position': 'absolute',
    'margin': 0,
    'padding': 0,
    'border': 0,
    'background-image': 'url("' + RAW_GITHUB_PREFIX + '/h' + ((index % N_HEARTS) + 1) + '.png")',
    'width': '100px',
    'height': '120px',
    'background-repeat': 'no-repeat',
    'transition': '1000ms linear all'
  });

  this.$heart.attr('id', 'heart' + index);
  this.$heart.attr('pointer-events', 'visibleFill');

  this.IsShow = function() {
    if (this.show) {
      return true;
    }
    return false;
  };

  this.AdjustX = function(x) {
    var screenWidth = $(window).width();
    var oneFourOfWidth = screenWidth / 4;
    // Check if it goes out of screen
    if (x < oneFourOfWidth) {
      x = screenWidth - x;
    }
    var right_most = $(window).width() - this.$heart.width() - 20;
    if (x > right_most) {
      x = right_most;
    }
    return x;
  };

  this.AdjustY = function(y) {
    if (y < 100) {
      y = 100;
    }

    var bottom_most = $(window).height() - this.$heart.height() - 20;
    if (y > bottom_most) {
      y = bottom_most;
    }
   
    return y;
  };

  this.SetPosition = function(x, y) {
    this.$heart.css({
      'display': 'block',
      'left': x.toString() + 'px',
      'top': y.toString() + 'px'
    });
  };

  this.SetRandomPosition = function() {
    var screenWidth = $(window).width();
    var screenHeight = $(window).height();
    var x = Math.floor(Math.random() * screenWidth); 
    var y = Math.floor(Math.random() * screenHeight); 
    x = this.AdjustX(x);
    y = this.AdjustY(y);
    this.SetPosition(x, y);
  };

  this.Hide = function() {
    this.show = false;
    this.$heart.css({
      'display': 'none'
    });
  };

  this.AppendToBody = function() {
    $('body').append(this.$heart); 
  }

  this.Show = function() {
    this.show = true;
  };

  this.RotateRight = function() {
    this.$heart.css({
      'transform': 'rotate(30deg)'
    })
  };

  this.RotateLeft = function() {
    this.$heart.css({
      'transform': 'rotate(-30deg)'
    })
  };
}

var MAX_HEARTS = 25;
var N_HEARTS = 6;

var allHearts = [];

function HideHeart(id) {
  $('#heart' + id).css({
    'visibility': 'hidden'
  })
}

function ShowHeart(id) {
  $('#heart' + id).css({
    'visibility': 'visible'
  })
}

function IsVisible(id) {
  return document.getElementById('heart' + id).style.visibility === 'visible';
}

function IsInvisible(id) {
  return document.getElementById('heart' + id).style.visibility === 'hidden';
}

function StartHearts() {
  for (var i = 0; i < MAX_HEARTS; ++i) {
    allHearts[i] = new Heart(i);   
    allHearts[i].AppendToBody();
  }

  setInterval(function() {
    var id = Math.floor(Math.random() * MAX_HEARTS);
    if (IsInvisible(id)) {
      ShowHeart(id);
    } else if (IsVisible(id)) {
      HideHeart(id);
    } else {
      ShowHeart(id);
      allHearts[id].SetRandomPosition();
      // Set up rotation
      setInterval(function() {
        allHearts[id].RotateRight();
        setTimeout(function() {
          allHearts[id].RotateLeft();
        }, 4000);
      }, 8000);
      // Set up moves
      setInterval(function() {
        allHearts[id].SetRandomPosition();        
      }, 5000);
      allHearts[id].Show();
      allHearts[id].RotateLeft();
    }
  }, 5000);
  
}

$(document).ready(function() {
  StartHearts();
});
